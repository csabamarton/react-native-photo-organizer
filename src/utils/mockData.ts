const ocean = require('../../assets/images/ocean.jpg');
const jump = require('../../assets/images/jump.jpg');
const vinyl = require('../../assets/images/vinyl.jpg');

interface Photo {
  id: string;
  uri: any;
}

export const mockPhotos: Photo[] = Array.from({ length: 50 }, (_, index) => {
  const uri = index % 3 === 0 ? ocean : index % 3 === 1 ? jump : vinyl;
  return { id: `${index + 1}`, uri };
});
