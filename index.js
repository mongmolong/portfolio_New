
const move02 = document.querySelector('#move02');
const popBtn = document.querySelector('.pop-btn');
const popMenuList = document.querySelector('.pop-menu');
const aboutUl = document.querySelectorAll('.about-right-ul');
const aboutLi = document.querySelectorAll('.about-right-ul li');

window.addEventListener('scroll', function () {
  const rect = move02.getBoundingClientRect();

  if (rect.top <= window.innerHeight && rect.bottom < 0) {
    popBtn.style.opacity = '1';
  } else {
    popBtn.style.opacity = '0';
  }
});


// pop-btn
popBtn.addEventListener("mouseover", function (e) {
  popMenuList.classList.add('pop_on');
  popMenuList.addEventListener("mouseleave", function (e) {
    popMenuList.classList.remove('pop_on');
  });
});

// popMenuList
popMenuList.addEventListener("mouseover", function () {
  aboutLi.forEach(function (li) {
    li.classList.add('about_line');  
  });
});

popMenuList.addEventListener("mouseleave", function () {
  aboutLi.forEach(function (li) {
    li.classList.remove('about_line'); 
  });
});



// about-----
document.querySelectorAll('.about-right-ul li').forEach(item => {
  item.addEventListener('click', function (e) {
    this.classList.toggle('about_on');
    e.stopPropagation();
  });
});


// thankyou------
window.addEventListener('load', () => {
  const container = document.querySelector('.random-images-container');
  const numImages = 10;

  // 사용할 이미지 URL
  const imageUrl = 'images/cube.png';

  function createRandomImage() {
    const image = document.createElement('img');
    image.src = imageUrl;
    image.classList.add('random-image');

    const randomSize = 50 + Math.random() * 150; // 50px에서 200px 사이로 랜덤 크기 설정
    image.style.width = `${randomSize}px`;
    image.style.height = `${randomSize}px`;

    const randomX = Math.random() * window.innerWidth;
    const randomY = Math.random() * window.innerHeight;
    image.style.left = `${randomX}px`;
    image.style.top = `${randomY}px`;

    const randomDelay = Math.random() * 5;
    const randomDuration = 5 + Math.random() * 5;

    image.style.animationDelay = `${randomDelay}s`;
    image.style.animationDuration = `${randomDuration}s`;

    container.appendChild(image);
  }

  for (let i = 0; i < numImages; i++) {
    createRandomImage();
  }
});


// --------------------

