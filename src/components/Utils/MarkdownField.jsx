import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import MDEditor from '@uiw/react-md-editor';
import rehypeSanitize from 'rehype-sanitize';

export default function MarkdownField(props) {
  const { md, edit, onChange } = props;

  const [value, setValue] = useState(md);

  useEffect(() => {
    setValue(md);
  }, [md]);

  const handleChange = (v) => {
    setValue(v);
    onChange(v);
  };

  return (
    <div className="markdown-note">
      {edit ? (
        <MDEditor
          value={value}
          onChange={handleChange}
          previewOptions={{
            rehypePlugins: [[rehypeSanitize]],
          }}
        />
      ) : (
        <MDEditor.Markdown source={value} />
      )}
    </div>
  );
}

MarkdownField.propTypes = {
  md: PropTypes.string,
  edit: PropTypes.bool,
  onChange: PropTypes.func,
};

MarkdownField.defaultProps = {
  md: '',
  edit: false,
  onChange: () => {},
};
