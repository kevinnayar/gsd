import * as React from 'react';
// @ts-ignore: image files
import allImages from '../../assets/images/*.jpg';
import { getRandomInt } from '../../utils/baseUtils';

export const ImageRandomizer = React.memo(() => {
  const images = Object.keys(allImages).map(key => allImages[key]);
  const index = getRandomInt(images.length, true);
  const image = images[index];
  return (
    <div className="image-randomizer" style={{ backgroundImage: `url(${image})` }} />
  );
});



