import * as React from 'react';
// @ts-ignore: image files
import allImages from '../../assets/images/icons/*.png';
import { getRandomInt } from '../../utils/baseUtils';

const images = Object.keys(allImages).map(key => allImages[key]);
const index = getRandomInt(images.length, true);
const image = images[index];

function NoneTaskEditor() {
  const imageKeys = Object.keys(allImages);
  return (
    <div className="none--task-editor">
      <img className="none--task-editor__image" src={image} />
    </div>
  );
}

export default React.memo(NoneTaskEditor);



