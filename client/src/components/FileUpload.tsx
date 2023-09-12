import React, { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import { FiCamera } from 'react-icons/fi';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import {
  RootState,
  removeAllImage,
  removeThatImage,
  setImages,
} from '../store';
import { AiOutlineClose } from 'react-icons/ai';

const Component = styled.div`
  label {
    padding: 1rem 1.5rem;
    border: 1px solid #eee;
    font-size: 30px;
    transition: all 0.3s;
    color: gray;
    cursor: pointer;

    &:hover {
      transform: scale(1.2);
    }
  }
`;

const ImageContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 0.5rem;
  width: 100px;
  height: 100px;
  gap: 10px;
`;

const ImagePrevWrap = styled.div`
  width: 100%;
  position: relative;
`;

const ImagePreview = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  cursor: pointer;
`;

const RemoveButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  color: #fff;
  font-size: 1.2rem;
  border-radius: 50%;
  transition: all 0.3s linear;
  width: 30px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #777;

  &:hover {
    transform: scale(1.2);
  }
`;

interface IFileUpload {
  onImagePreview: (arg: number) => void;
  setImageFile: any;
  setDeletedImages?: any;
}

const FileUpload = ({
  onImagePreview,
  setImageFile,
  setDeletedImages,
}: IFileUpload) => {
  const [nonEmptyImages, setNonEmptyImages] = useState(false);

  const { uploadImages } = useSelector((state: RootState) => state.upload);

  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

  const onFileUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const file = e.target.files && e.target.files[0];

    setImageFile((prev: any) => [...prev, file]);

    if (file) {
      const reader = new FileReader();

      if (file && file.type.match('image.*')) {
        reader.readAsDataURL(file);

        reader.onload = function () {
          const data = {
            index: index,
            url: reader.result as string,
          };

          dispatch(setImages(data));
        };
      }
    }
  };

  const onClickFileRemove = (index: number, imageKey?: string) => {
    dispatch(removeThatImage({ index }));

    setImageFile((prev: any[]) => {
      const newImageFile = prev.filter((_, i) => i !== index);

      return newImageFile;
    });

    if (setDeletedImages && imageKey) {
      // 이미지 삭제 시, deletedImages 배열에 파일명 추가
      setDeletedImages((prevDeletedImages: any) => [
        ...prevDeletedImages,
        imageKey,
      ]);
    }
  };
  useEffect(() => {
    const imageEmpty = uploadImages.filter(
      (uploadImage) => uploadImage.url.length !== 0
    );

    if (imageEmpty.length !== 0) {
      setNonEmptyImages(true);
    } else {
      setNonEmptyImages(false);
    }
  }, [uploadImages]);

  useEffect(() => {
    return () => {
      dispatch(removeAllImage());
    };
  }, []);
  return (
    <Component>
      <ImageContainer>
        {uploadImages.map((image, index) =>
          image.url ? (
            <ImagePrevWrap key={index}>
              {image.url.startsWith('data:image') ? (
                <>
                  <ImagePreview
                    src={image.url}
                    alt={`Image ${index}`}
                    onClick={() => onImagePreview(index)}
                  />
                  <RemoveButton
                    onClick={() => onClickFileRemove(index)}
                    type='button'
                  >
                    <AiOutlineClose />
                  </RemoveButton>
                </>
              ) : (
                <>
                  <ImagePreview
                    src={`https://plant-newjeans.s3.ap-northeast-2.amazonaws.com/gallery/${image.url}`}
                    alt={`Image ${index}`}
                    onClick={() => onImagePreview(index)}
                  />
                  <RemoveButton
                    onClick={() => onClickFileRemove(index, image.url)}
                    type='button'
                  >
                    <AiOutlineClose />
                  </RemoveButton>
                </>
              )}
            </ImagePrevWrap>
          ) : (
            <label key={index} htmlFor={`input-file-${index}`}>
              <FiCamera />
              <input
                type='file'
                name={`file-${index}`}
                id={`input-file-${index}`}
                accept='image/*'
                // multiple
                style={{ display: 'none' }}
                onChange={(e) => onFileUpload(e, index)}
              />
            </label>
          )
        )}
      </ImageContainer>
      {nonEmptyImages && (
        <div style={{ padding: '.5rem', fontSize: '.8rem', fontWeight: '500' }}>
          해당 이미지를 클릭하면 이미지를 미리 볼 수 있습니다.
        </div>
      )}
    </Component>
  );
};

export default FileUpload;
