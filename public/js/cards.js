Vue.config.devtools = true;

Vue.component('card', {
    template: `
    <div class="card-wrap" :class="[cardName]"
      @mousemove="handleMouseMove"
      @mouseenter="handleMouseEnter"
      @mouseleave="handleMouseLeave"
      ref="card">
      <div class="card"
        :style="cardStyle">
        <div class="card-bg" :style="[cardBgTransform, cardBgImage]"></div>
        <div class="card-info">
          <div class="card-header"> <slot  name="header"></slot></div>
        </div>
      </div>
      <slot name="actions"></slot>
    </div>
    `,
    mounted() {
        this.width = this.$refs.card.offsetWidth;
        this.height = this.$refs.card.offsetHeight;
    },
    props: ['dataImage', 'dataName'],
    data: () => ({
        width: 0,
        height: 0,
        mouseX: 0,
        mouseY: 0,
        mouseLeaveDelay: null,
    }),

    computed: {
        mousePX() {
            return this.mouseX / this.width;
        },
        mousePY() {
            return this.mouseY / this.height;
        },
        cardStyle() {
            const rX = this.mousePX * 30;
            const rY = this.mousePY * -30;
            return {
                transform: `rotateY(${rX}deg) rotateX(${rY}deg)`,
            };
        },
        cardBgTransform() {
            const tX = this.mousePX * -40;
            const tY = this.mousePY * -40;
            return {
                transform: `translateX(${tX}px) translateY(${tY}px)`,
            };
        },
        cardBgImage() {
            return {
                backgroundImage: `url(${this.dataImage})`,
            };
        },
        cardName() {
            return this.dataName;
        },
    },

    methods: {
        handleMouseMove(e) {
            this.mouseX = e.pageX - this.$refs.card.offsetLeft - this.width / 2;
            this.mouseY = e.pageY - this.$refs.card.offsetTop - this.height / 2;
        },
        handleMouseEnter() {
            clearTimeout(this.mouseLeaveDelay);
        },
        handleMouseLeave() {
            this.mouseLeaveDelay = setTimeout(() => {
                this.mouseX = 0;
                this.mouseY = 0;
            }, 1000);
        },
    },
});
// register modal component
Vue.component('modal', {
    template: '#modal-template',
});

const app = new Vue({
    el: '#app',
    data: {
        showModal: false,
        showMathModal: false,
        showMatchingModal: false,
        showPuzzleModal: false
    },
});
