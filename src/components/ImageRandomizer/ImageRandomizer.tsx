import * as React from 'react';
// @ts-ignore: image files
import allImages from '../../assets/images/pexels/*.jpg';
import { getRandomInt } from '../../utils/baseUtils';

type Attribution = {
  userUrl: string,
  userName: string,
  webUrl: string,
};

const imageList: Array<[string, Attribution]> = [
  [
    'sam-kolder-2387873',
    {
      userName: 'Sam Kolder',
      webUrl: 'https://www.pexels.com/photo/three-men-standing-near-waterfalls-2387873/',
      userUrl: 'https://www.pexels.com/@samkolder',
    },
  ],
  [
    'paul-iJsendoorn-33041',
    {
      userName: 'Paul IJsendoorn',
      webUrl: 'https://www.pexels.com/photo/antelope-canyon-33041/',
      userUrl: 'https://www.pexels.com/@photospublic',
    },
  ],

  [
    'andy-vu-3244513', 
    { 
      userName: 'Andy Vu',
      webUrl: 'https://www.pexels.com/photo/brown-landscape-under-grey-sky-3244513/',
      userUrl: 'https://www.pexels.com/@andyhvu',
    },
  ],

  [
    'eberhard-grossgasteiger-572897', 
    {
      userName: 'Eberhard Grossgasteiger',
      webUrl: 'https://www.pexels.com/photo/mountain-covered-snow-under-star-572897/',
      userUrl: 'https://www.pexels.com/@eberhardgross',
    },
  ],

  [
    'jaymantri-4827', 
    {
      userName: 'Jaymantri',
      webUrl: 'https://www.pexels.com/photo/nature-forest-trees-fog-4827/',
      userUrl: 'https://www.pexels.com/@jaymantri',
    },
  ],
];

const ImageText = React.memo((props: { id: string }) => {
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

const images = Object.keys(allImages).map(key => allImages[key]);
const index = getRandomInt(images.length, true);
const image = images[index];

function ImageRandomizer() {
  return (
    <div className="image-randomizer" style={{ backgroundImage: `url(${image})` }}>
      <ImageText id={image.replace('/', '')} />
    </div>
  );
}

export default React.memo(ImageRandomizer);



