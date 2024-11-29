setTimeout(function() {
  document.getElementById('loading-container').style.display = 'none';
}, 3000);


// ------------------------
const move02 = document.querySelector('#move02');
const popBtn = document.querySelector('.pop-btn');
const popMenuList = document.querySelector('.pop-menu');
const aboutUl = document.querySelectorAll('.about-right-ul');
const aboutLi = document.querySelectorAll('.about-right-ul li');

window.addEventListener('scroll', function () {
  const rect = move02.getBoundingClientRect();

  // move02가 화면에 들어올 때 버튼을 표시
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

// popMenuList.addEventListener("click", function (e) {
//   popMenuList.classList.remove('pop_on');
//   aboutLi.forEach(function (li) {
//     li.classList.remove('about_line');
//   });
// });

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
    // e.stopPropagation();
  });
});


// thankyou------
window.addEventListener('load', () => {
  const container = document.querySelector('.random-images-container');
  const numImages = 10;

  const imageUrl = 'images/cube.png';

  function createRandomImage() {
    const image = document.createElement('img');
    image.src = imageUrl;
    image.classList.add('random-image');

    const randomSize = 50 + Math.random() * 150;
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


// -마우스휠-------------------
document.addEventListener("DOMContentLoaded", function () {
  const items = document.querySelector(".items");
  const itemsWrapper = document.querySelector(".items-wrapper");
  const itemsLi = document.querySelectorAll(".items-wrapper li");

  let isHorizontalScrollEnabled = false;
  let chk = true;
  let scrollPosX = 0;

  function tmp() {
    const totalWidth = window.innerWidth * itemsLi.length;

    // 너비 
    itemsWrapper.style.width = `${totalWidth}px`;
    itemsWrapper.style.height = '100vh';
    itemsWrapper.style.position = 'relative';
    itemsWrapper.style.top = '0';
    itemsWrapper.style.left = '0';

    // 각 li 
    itemsLi.forEach(li => {
      li.style.width = `${window.innerWidth}px`; // 각 li는 화면 너비에 맞춰서 설정
      li.style.height = '100vh';
      li.style.display = 'flex';
    });

    items.style.height = '100vh';
  }

  tmp();

  let array = Array.from(itemsLi).map(li => li.offsetLeft);

  //영역 90%
  window.addEventListener('scroll', function () {
    const scrollTop = window.scrollY;
    const itemsTop = items.getBoundingClientRect().top + scrollTop;
    const windowHeight = window.innerHeight;

    if (scrollTop + windowHeight > itemsTop + (windowHeight * 0.9) || scrollTop + windowHeight < itemsTop + (windowHeight * 0.9)) {
      if (!isHorizontalScrollEnabled) {
        isHorizontalScrollEnabled = true;
      }
    } else {
      if (isHorizontalScrollEnabled) {
        isHorizontalScrollEnabled = false;
      }
    }
  });

  items.addEventListener('wheel', function (event) {
    if (isHorizontalScrollEnabled && chk) {
      chk = false;
      setTimeout(function () {
        chk = true;
      }, 500);

      const w_delta = event.deltaY;

      if (w_delta > 0 && scrollPosX < itemsWrapper.offsetWidth - window.innerWidth) {
        scrollPosX += window.innerWidth;
        itemsWrapper.style.transform = `translateX(-${scrollPosX}px)`;
      } else if (w_delta < 0 && scrollPosX > 0) {
        scrollPosX -= window.innerWidth;
        itemsWrapper.style.transform = `translateX(-${scrollPosX}px)`;
      }
    }
  });

  window.addEventListener('resize', function () {
    array = Array.from(itemsLi).map(li => li.offsetLeft);
    tmp(); // 화면 크기 변경에 맞춰
  });
});
