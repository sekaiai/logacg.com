class Sakura {
  constructor() {
    // 直接使用body作为容器
    this.el = document.body;
    
    if (!this.el) {
      throw new Error('Body element not found');
    }

    // 初始化默认设置
    this.settings = {
      className: 'sakura',
      fallSpeed: 1,
      maxSize: 14,
      minSize: 10,
      minDelay: 3000,
      maxDelay: 6000,
      colors: [
        {
          gradientColorStart: 'rgba(255, 183, 197, 0.9)',
          gradientColorEnd: 'rgba(255, 197, 208, 0.9)',
          gradientColorDegree: 120
        },
        {
          gradientColorStart: 'rgba(255, 0, 50, 0.9)',
          gradientColorEnd: 'rgba(255, 197, 208, 0.9)',
          gradientColorDegree: 120
        }
      ]
    };

    // 开始创建花瓣
    this.el.setAttribute('data-sakura-anim-id', window.requestAnimationFrame(() => this._createPetal()));
  }

  // 从数组中随机选择一个元素
  _randomArrayElem(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  // 生成指定范围内的随机整数
  _randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // 处理带前缀的事件监听
  _prefixedEvent(element, type, callback) {
    const prefixes = ['webkit', 'moz', 'MS', 'o', ''];
    for (let p = 0; p < prefixes.length; p++) {
      let animType = type;
      if (!prefixes[p]) {
        animType = type.toLowerCase();
      }
      element.addEventListener(prefixes[p] + animType, callback, false);
    }
  }

  // 检查元素是否在视口中
  _elementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  // 创建花瓣元素并添加动画
  _createPetal() {
    const delay = this._randomInt(this.settings.minDelay, this.settings.maxDelay);
    if (this.el.dataset.sakuraAnimId) {
      setTimeout(() => {
        window.requestAnimationFrame(() => this._createPetal());
      }, delay);
    }

    const animationNames = {
      blowAnimations: ['blow-soft-left', 'blow-medium-left', 'blow-soft-right', 'blow-medium-right'],
      swayAnimations: ['sway-0', 'sway-1', 'sway-2', 'sway-3', 'sway-4', 'sway-5', 'sway-6', 'sway-7', 'sway-8']
    };

    const blowAnimation = this._randomArrayElem(animationNames.blowAnimations);
    const swayAnimation = this._randomArrayElem(animationNames.swayAnimations);
    const fallTime = (document.documentElement.clientHeight * 0.01 + Math.round(Math.random() * 5)) * this.settings.fallSpeed;

    const animationsArr = [
      `fall ${fallTime}s linear 0s 1`,
      `${blowAnimation} ${(fallTime > 30 ? fallTime : 30) - 20 + this._randomInt(0, 20)}s linear 0s infinite`,
      `${swayAnimation} ${this._randomInt(2, 4)}s linear 0s infinite`
    ];
    const animations = animationsArr.join(', ');

    const petal = document.createElement('div');
    petal.classList.add(this.settings.className);
    const height = this._randomInt(this.settings.minSize, this.settings.maxSize);
    const width = height - Math.floor(this._randomInt(0, this.settings.minSize) / 3);

    const color = this._randomArrayElem(this.settings.colors);

    petal.style.background = `linear-gradient(${color.gradientColorDegree}deg, ${color.gradientColorStart}, ${color.gradientColorEnd})`;
    petal.style.webkitAnimation = animations;
    petal.style.animation = animations;
    petal.style.borderRadius = `${this._randomInt(
      this.settings.maxSize,
      this.settings.maxSize + Math.floor(Math.random() * 10)
    )}px ${this._randomInt(1, Math.floor(width / 4))}px`;
    petal.style.height = `${height}px`;
    petal.style.left = `${Math.random() * document.documentElement.clientWidth - 100}px`;
    petal.style.marginTop = `${-(Math.floor(Math.random() * 20) + 15)}px`;
    petal.style.width = `${width}px`;

    this._prefixedEvent(petal, 'AnimationEnd', () => {
      if (!this._elementInViewport(petal)) {
        petal.remove();
      }
    });

    this._prefixedEvent(petal, 'AnimationIteration', () => {
      if (!this._elementInViewport(petal)) {
        petal.remove();
      }
    });

    this.el.appendChild(petal);
  }
}

// 自动执行，创建樱花动画实例
new Sakura();
    