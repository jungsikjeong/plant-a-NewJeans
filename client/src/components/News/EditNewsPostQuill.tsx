import React, { FormEvent, useEffect, useMemo, useRef, useState } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import { ImageResize } from 'quill-image-resize-module-ts';
import 'react-quill/dist/quill.snow.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import AWS from 'aws-sdk';
import getRandomImageName from '../../utils/getRandomImageName';
import { api } from '../../api';

Quill.register('modules/imageResize', ImageResize);

const REGION = process.env.REACT_APP_AWS_S3_BUCKET_REGION;
const ACCESS_KEY = process.env.REACT_APP_AWS_S3_BUCKET_ACCESS_KEY_ID;
const SECRET_ACCESS_KEY = process.env.REACT_APP_AWS_S3_BUCKET_SECRET_ACCESS_KEY;

const Container = styled.div`
  .quill {
    .ql-container {
      height: 250px;
      max-height: 250px;
    }
    .ql-editor {
      height: 250px;
      max-height: 250px;
      overflow: auto;
    }

    .ql-snow {
      border: 1px solid #eee;
    }
  }
`;

const Button = styled.button<{ bgColor: string }>`
  width: 100%;
  padding: 0.5rem;
  margin: 0.5rem 0;
  border-radius: 5px;
  border: 1px solid #eee;
  font-weight: bold;
  transition: all 0.3s ease;
  &:hover {
    color: #fff;
    background-color: ${({ bgColor }) => bgColor};
  }
`;

interface ITextEditor {
  title: string;
  contents: string;
  setContents: React.Dispatch<React.SetStateAction<string>>;
  fileImage?: string[];
  id?: string;
}
let uploadSuccess: boolean = false;

const EditNewsPostQuill = ({
  title,
  contents,
  setContents,
  fileImage,
  id,
}: ITextEditor) => {
  const [fileNames, setFileNames] = useState<any[]>([]);
  // 이미지를 quill에서 지웠을때 이미지 삭제처리를위한 state
  // aws s3 파일 url이 들어감
  const [addresses, setAddresses] = useState<any[]>([]);
  // 기존이미지를 삭제했을때 서버에서 분류해서 저장하기위한 state
  const [deletedImages, setDeletedImages] = useState<any[]>([]);

  const { pathname } = useLocation();
  const navigator = useNavigate();

  const quillRef = useRef(null) as any;

  const titleLengthWarning = useMemo(() => {
    if (title.trim().length < 2) {
      return '제목은 최소 2글자이상 작성해주세요';
    }

    return '';
  }, [title]);

  const contentsLengthWarning = useMemo(() => {
    if (contents.length < 1) {
      return '내용은 최소 한글자이상 작성해주세요';
    }

    return '';
  }, [contents]);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (titleLengthWarning) {
      return alert(titleLengthWarning);
    }

    if (contentsLengthWarning) {
      return alert(contentsLengthWarning);
    }

    const body = {
      title,
      contents,
      fileNames,
      deletedImages,
    };

    try {
      const res = await api.put(`/newsPosts/${id}`, body);
      if (res.status === 200) {
        // 기존 이미지를 삭제했을때
        addresses.map(async (address) => {
          if (!contents.includes(address)) {
            // AWS S3 주소에서 파일명 추출
            const fileName = address.split('/').pop();

            await deleteImageFromS3(fileName);
          }
        });

        alert('News 편집 완료');
        uploadSuccess = true;
        setFileNames([]);
        navigator('/pages/news');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const saveImage = () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.addEventListener('change', async () => {
      const file = input.files && input.files[0];

      const editor = quillRef.current.getEditor();
      // 현재 커서 위치 저장
      const range = editor.getSelection(true);

      // 서버에 올려질때까지 표시할 로딩 placeholder 삽입
      editor.insertEmbed(range.index, 'image', `/images/imgLoading.gif`);

      if (file && range) {
        try {
          //업로드할 파일의 이름을 랜덤이름으로 저장
          const fileName = getRandomImageName(file.name);

          setFileNames((prev) => [...prev, fileName]);

          // s3 관련 설정들
          AWS.config.update({
            region: REGION,
            accessKeyId: ACCESS_KEY,
            secretAccessKey: SECRET_ACCESS_KEY,
          });
          //앞서 생성한 file을 담아 s3에 업로드하는 객체를 만든다
          const upload = new AWS.S3.ManagedUpload({
            params: {
              ACL: 'public-read',
              Bucket: 'plant-newjeans/news', //버킷 이름
              Key: `${fileName}`,
              Body: file,
            },
          });
          //이미지 업로드 후
          //곧바로 업로드 된 이미지 url을 가져오기
          const IMG_URL = await upload.promise().then((res) => res.Location);
          //useRef를 사용해 에디터에 접근한 후
          //에디터의 현재 커서 위치에 이미지 삽입
          const editor = quillRef.current.getEditor();
          const range = editor.getSelection();

          // 정상적으로 업로드 됐다면 로딩 placeholder 삭제
          editor.deleteText(range.index, 1);

          // 가져온 위치에 이미지를 삽입한다
          editor.insertEmbed(range.index, 'image', IMG_URL);

          addresses.push(IMG_URL);

          // 사용자 편의를 위해 커서 이미지 오른쪽으로 이동
          editor.setSelection(range.index + 1);
        } catch (error) {
          console.log(error);
        }
      }
    });
  };

  const onPageReset = () => {
    // aws s3 이미지 삭제
    fileNames.forEach(async (fileName) => {
      await deleteImageFromS3(fileName);
    });
    navigator('/');
  };

  useEffect(() => {
    // EditNews.tsx에서 fileImage에 파일의 이름을 배열로 담아서 보내줌
    // EX) [파일이름_1.jpg,파일이름_2.jpg,...]
    if (fileImage) {
      fileImage.map((imgName) => setAddresses((prev) => [...prev, imgName]));
    }
  }, []);

  useEffect(() => {
    // react-quill에서 이미지를 지우면
    addresses.map(async (address) => {
      if (!contents.includes(address)) {
        // AWS S3주소에서 파일명만 추출
        const fileName = address.split('/').pop();

        deletedImages.push(fileName);
      }

      return true;
    });
  }, [addresses, contents]);

  const deleteImageFromS3 = async (fileName: string) => {
    const s3 = new AWS.S3({
      region: REGION,
      accessKeyId: ACCESS_KEY,
      secretAccessKey: SECRET_ACCESS_KEY,
    });
    const params = {
      Bucket: 'plant-newjeans/news',
      Key: `${fileName}`,
    };

    try {
      await s3.deleteObject(params).promise();
      console.log(`Deleted ${fileName} from S3.`);
    } catch (error) {
      console.error(`Error deleting ${fileName} from S3: `, error);
    }
  };

  const modules = useMemo(() => {
    if (pathname.startsWith('/pages/newsPost/edit')) {
      return {
        toolbar: {
          container: [
            ['bold', 'italic', 'underline', 'strike'],
            [{ size: ['small', false, 'large', 'huge'] }, { color: [] }],
            ['image'],
          ],

          handlers: { image: saveImage },
        },

        imageResize: {
          parchment: {
            image: {
              attributes: ['width', 'height'],
            },
          },
          modules: ['Resize', 'DisplaySize'],
        },
      };
    } else {
      // 다른 페이지의 경우 이미지 삽입 기능을 포함하지 않는 설정 반환
      return {
        toolbar: {
          container: [
            ['bold', 'italic', 'underline', 'strike'],
            [{ size: ['small', false, 'large', 'huge'] }, { color: [] }],
          ],
        },
        imageResize: {
          parchment: {
            image: {
              attributes: ['width', 'height', 'alt'],
            },
          },
          modules: ['Resize', 'DisplaySize'],
        },
      };
    }
  }, [pathname]);

  // 게시글 저장안하고 페이지 뒤로가기 클릭할 시
  // 새로 올린 이미지 삭제
  useEffect(() => {
    return () => {
      if (fileNames && fileNames.length > 0 && !uploadSuccess) {
        fileNames.forEach(async (fileName) => {
          fileName && (await deleteImageFromS3(fileName));
        });
      }
    };
  }, [fileNames]);

  // 페이지 새로고침 혹은 다른 url로 이동시
  // 이미지 삭제
  useEffect(() => {
    const onBeforeUnload = (e: any) => {
      fileNames.forEach(async (fileName) => {
        await deleteImageFromS3(fileName);
      });

      e.returnValue = '이 페이지를 나가시겠습니까?';
    };

    window.addEventListener('beforeunload', onBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', onBeforeUnload);
    };
  }, [fileNames]);

  return (
    <Container>
      <ReactQuill
        ref={quillRef}
        modules={modules}
        theme='snow'
        value={contents}
        onChange={setContents}
        placeholder='여기에 내용을 입력하세요...'
      />
      <Button type='submit' bgColor={'skyblue'} onClick={onSubmit}>
        작성하기
      </Button>
      <Button type='button' bgColor={'tomato'} onClick={onPageReset}>
        취소하기
      </Button>
    </Container>
  );
};
export default EditNewsPostQuill;
