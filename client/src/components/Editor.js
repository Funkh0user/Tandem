import React from 'react';
import ReactQuill from 'react-quill';
import PropTypes from 'prop-types';

/*
 * Simple editor component that takes placeholder text as a prop
 */
class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.state = { editorHtml: "", theme: 'snow' };
    this.handleChange = this.handleChange.bind(this);

  }
  handleChange(html, delta, source, editor) {
    // console.log(html)
    // console.log(delta)
    // console.log(source)
    // console.log(editor)
    this.setState({ editorHtml: html });
    this.props.handleDescriptionChange(html)
  }

  handleThemeChange(newTheme) {
    if (newTheme === 'core') newTheme = null;
    this.setState({ theme: newTheme });
  }

  render() {
    return (
      <ReactQuill
        name='editor'
        onChange={this.handleChange}
        value={this.state.editorHtml}
        modules={Editor.modules}
        formats={Editor.formats}
        bounds={'.app'}
        placeholder={this.props.placeholder}
      >
        {/* <input className="my-editing-area"></input> */}
      </ReactQuill>
    );
  }
}

/*
 * Quill modules to attach to editor
 * See https://quilljs.com/docs/modules/ for complete options
 */
Editor.modules = {
  toolbar: [
    [{ header: '1' }, { header: '2' }, { font: [] }],
    [{ size: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [
      { list: 'ordered' },
      { list: 'bullet' },
      { indent: '-1' },
      { indent: '+1' },
    ],
    ['link', 'image', 'video'],
    ['clean'],
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: true,
  },
};
/*
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
Editor.formats = [
  'header',
  'font',
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
  'image',
  'video',
];

/*
 * PropType validation
 */
Editor.propTypes = {
  placeholder: PropTypes.string,
};
export default Editor;
