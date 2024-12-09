// document.body.classList.add('loading');

// setTimeout(function () {
//   document.getElementById('loading-container').style.display = 'none';
//   document.body.classList.remove('loading');
// }, 3000);

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

// pop-btn 클릭시 popMenuList 보이기/숨기기
popBtn.addEventListener("click", function (e) {
  e.stopPropagation(); // 클릭 이벤트 전파 막기
  popMenuList.classList.toggle('pop_on');
});

// popMenuList 외부를 클릭했을 때 pop_on 클래스를 제거
document.addEventListener("click", function (e) {
  if (!popMenuList.contains(e.target) && e.target !== popBtn) {
    popMenuList.classList.remove('pop_on');
  }
});

// popMenuList에서 마우스 오버시 aboutLi에 스타일 추가
popMenuList.addEventListener("mouseover", function () {
  aboutLi.forEach(function (li) {
    li.classList.add('about_line');
  });
});

// popMenuList에서 마우스 나갈 때 pop_on 클래스를 제거하고 aboutLi에서 스타일 제거
popMenuList.addEventListener("mouseleave", function () {
  popMenuList.classList.remove('pop_on'); // pop_on 클래스 제거
  aboutLi.forEach(function (li) {
    li.classList.remove('about_line'); // aboutLi에서 스타일 제거
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

// Intersection Observer 설정
const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
      entry.target.classList.add('Thankyou_active');
    }
    else {
      entry.target.classList.remove('show');
      entry.target.classList.remove('Thankyou_active');
    }
  });
}, {
  threshold: 0.5
});

const target = document.querySelector('.Thankyou-container');
observer.observe(target);

// -마우스휠-------------------
document.addEventListener("DOMContentLoaded", function () {
  const items = document.querySelector(".items");
  const itemsWrapper = document.querySelector(".items-wrapper");
  const itemsLi = document.querySelectorAll(".items-wrapper li");
  const images = document.querySelectorAll(".items-wrapper li .items-right-photo p img");

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
      li.style.width = `${window.innerWidth}px`;
      li.style.height = '100vh';
      li.style.display = 'flex';
    });

    items.style.height = '100vh';
  }

  tmp();

  let array = Array.from(itemsLi).map(li => li.offsetLeft);

  // Intersection Observer 설정 (li 요소를 옵저빙하도록 변경)
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // 뷰포트에 보이면 opacity 1로 설정
        entry.target.querySelectorAll('img').forEach(img => {
          img.classList.add('item-show');
          img.closest('.items-right-photo').classList.add('photo_on');
        });
      } else {
        // 뷰포트에서 벗어나면 opacity 0으로 설정
        entry.target.querySelectorAll('img').forEach(img => {
          img.classList.remove('item-show');
          img.closest('.items-right-photo').classList.remove('photo_on');
        });
      }
    });
  }, {
    threshold: 0.3 // li 요소가 30% 이상 보일 때 트리거
  });

  // li 요소에 대해 observer 적용 (각 li의 자식 img도 확인)
  itemsLi.forEach(li => {
    observer.observe(li);
  });

  // 영역 90% 체크
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
    tmp();
  });
});
