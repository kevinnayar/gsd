import * as React from 'react';
// @ts-ignore: image files
import allImages from '../../assets/images/pexels/*.jpg';
import { getRandomInt } from '../../utils/baseUtils';

type Attribution = {
  userUrl: string,
  userName: string,
  webUrl: string,
};

const ImageText = React.memo((props: { id: string }) => {
  const imageList: Array<[string, Attribution]> = [
    [
      '15286',
      {
        userUrl: 'https://www.pexels.com/@luisdelrio',
        userName: 'Luis del Río',
        webUrl: 'https://www.pexels.com/photo/person-walking-between-green-forest-trees-15286/'
      },
    ],
    [
      '2387873',
      {
        userUrl: 'https://www.pexels.com/@samkolder',
        userName: 'Sam Kolder',
        webUrl: 'https://www.pexels.com/photo/three-men-standing-near-waterfalls-2387873/',
      },
    ],
    [
      '33041',
      {
        userUrl: 'https://www.pexels.com/@photospublic',
        userName: 'Paul IJsendoorn',
        webUrl: 'https://www.pexels.com/photo/antelope-canyon-33041/',
      },
    ],
  ];

  const match = imageList.find(item => props.id.startsWith(item[0]));

  if (!match) return null;

  const item = match[1];

  return (
    <div className="image-randomizer__attribution">
      Photo by{' '}<strong><a href={item.userUrl} target="_blank">{item.userName}</a></strong>
      {' '}from{' '}<strong><a href={item.webUrl} target="_blank">Pexels</a></strong>
    </div>
  );
});

export const ImageRandomizer = React.memo(() => {
  const images = Object.keys(allImages).map(key => allImages[key]);
  const index = getRandomInt(images.length, true);
  const image = images[index];

  return (
    <div className="image-randomizer" style={{ backgroundImage: `url(${image})` }}>
      <ImageText id={image.replace('/', '')} />
    </div>
  );
});



