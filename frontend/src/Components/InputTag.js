import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { ReactComponent as Close } from "./x-icon.svg";
import ReactTagInput from "@pathofdev/react-tag-input";
import "@pathofdev/react-tag-input/build/index.css";
import "./InputTag.scss";
function InputTag(props) {
  const [tags, setTags] = useState([]);

  function inputKeyDown(e) {
    console.log(e.target.value);

    if (e.key === "Shift" && e.target.value) {
      if (
        tags.find((tag) => tag.toLowerCase() === e.target.value.toLowerCase())
      ) {
        return;
      }
      setTags([...tags, e.target.value]);
      e.target.value = "";
    } else if (e.key === "Backspace" && !e.target.value) {
      removeTag(tags.length - 1);
    }
  }

  function removeTag(i) {
    const newTagsArray = [...tags];
    newTagsArray.splice(i, 1);
    setTags([...newTagsArray]);
  }

  console.log(tags);
  return (
    <div className="input-tags">
      <Form.Label>{props.tagsType + ":"}</Form.Label>

      <ul className="input-tags-list">
        <li className="input-tags-input">
          <Form.Control
            type="text"
            placeholder={"Add or remove " + props.tagsType}
            onKeyDown={inputKeyDown}
          />
        </li>
        {tags.map((tag, i) => (
          <li key={tag}>
            <button
              className="input-tags-button"
              type="button"
              onClick={() => {
                {
                  removeTag(i);
                }
              }}
            >
              {tag}
              <div className="circle">
                <Close />
              </div>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default InputTag;
{
  /* <ReactTagInput tags={tags} onChange={(newTags) => setTags(newTags)} /> */
}
