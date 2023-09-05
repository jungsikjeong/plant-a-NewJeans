import React, { useMemo } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { styled } from 'styled-components';

const Container = styled.div`
  .quill {
    .ql-editor {
    }

    .ql-snow {
      border: 1px solid #eee;
    }
    .ql-container {
      height: 10rem;
    }
  }
`;

interface ITextEditor {
  contents: string;
  setContents: React.Dispatch<React.SetStateAction<string>>;
}

const TextEditor = ({ contents, setContents }: ITextEditor) => {
  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          ['bold', 'italic', 'underline', 'strike'],
          [{ size: ['small', false, 'large', 'huge'] }, { color: [] }],
        ],
      },
    }),
    []
  );

  return (
    <Container>
      <ReactQuill
        modules={modules}
        theme='snow'
        value={contents}
        onChange={setContents}
        placeholder='여기에 내용을 입력하세요...'
      />
    </Container>
  );
};
export default TextEditor;
