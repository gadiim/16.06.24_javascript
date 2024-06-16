
function createWrapper() {
  const wrapper = document.createElement('div');
  wrapper.classList.add('wrapper');

  const pictures = document.createElement('div');
  pictures.id = 'pictures';
  pictures.classList.add('pictures');

  wrapper.append(leftButton(), pictures, rightButton());

  return wrapper;
}

function createFoto(user) {
    const photo = document.createElement('img');
    photo.classList.add('picture');
    photo.setAttribute('src', user.picture.large);
    return photo;
}

function currentPosition() {
  const element = document.getElementById('pictures');
  const offsetLeft = element.offsetLeft;
  return offsetLeft;
}


function leftButton() {
  const leftBtn = document.createElement('button');
  leftBtn.innerHTML = '&#10094;';
  leftBtn.style.left = '0px';
  leftBtn.addEventListener('click', () => {
    const picturesContainer = document.getElementById('pictures');
    if (currentPosition() == 0) {
      picturesContainer.style.left = `-300px`;
    } 
    else if (currentPosition() == -300) {
      picturesContainer.style.left = `-600px`;
    }
    else if (currentPosition() == -600) {
      picturesContainer.style.transition = 'none';
      picturesContainer.style.left = `0px`;
      setTimeout(() => {
        picturesContainer.style.transition = 'left 0.7s ease';
      }, 1);
    }
  })
  return leftBtn;
}

function rightButton() {  
const rightBtn = document.createElement('button');
rightBtn.innerHTML = '&#10095;';
rightBtn.style.right = '0px';
rightBtn.addEventListener('click', () => {
  const picturesContainer = document.getElementById('pictures');
  if (currentPosition() == 0) {
    picturesContainer.style.transition = 'none';
    picturesContainer.style.left = `-600px`;
    setTimeout(() => {
      picturesContainer.style.transition = 'left 0.7s ease';
    }, 1);
  } 
  else if (currentPosition() == -300) {
    picturesContainer.style.left = `0px`;
  }
  else if (currentPosition() == -600) {
    picturesContainer.style.left = `-300px`;
  }
})
  return rightBtn;
}

fetch('https://randomuser.me/api/?results=3')
  .then((response) => response.json())
  .then(data => {
    const result = data.results;
    const largePicture = result.map(user => createFoto(user));
    const slidePictures = document.getElementById('pictures');
    slidePictures.append(...largePicture);
  });

const wrapper = createWrapper();

document.body.appendChild(wrapper);