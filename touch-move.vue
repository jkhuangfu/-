<template>
  <div @touchend="touchend" @touchmove="touchmove" @touchstart="touchstart">
    <slot></slot>
  </div>
</template>
<style lang="stylus" scoped></style>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
@Component
export default class TouchCom extends Vue {
  // 时间间隔
  @Prop({ type: Number, default: 300 })
  public readonly interval!: number;

  // 方向
  private direction: string = 'touch';

  // x方向坐标
  private startX: number = 0;
  private moveEndX: number = 0;

  // y轴方向坐标
  private startY: number = 0;
  private moveEndY: number = 0;

  // 起始及结束时间
  private EndTime: number = 0;
  private StartTime: number = 0;

  private touchstart(event: TouchEvent) {
    // 阻止默认事件（长按的时候出现复制）
    if (event.cancelable) {
      event.preventDefault();
    }
    this.StartTime = Date.now();
    this.startX = event.changedTouches[0].pageX;
    this.startY = event.changedTouches[0].pageY;
  }

  private touchmove(event: TouchEvent) {
    if (event.cancelable) {
      event.preventDefault();
    }

    this.moveEndX = event.changedTouches[0].pageX;
    this.moveEndY = event.changedTouches[0].pageY;
    const X = this.moveEndX - this.startX;
    const Y = this.moveEndY - this.startY;
    if (Math.abs(X) > Math.abs(Y) && X > 0) {
      this.direction = 'slideRight';
      console.log('left to right');
    } else if (Math.abs(X) > Math.abs(Y) && X < 0) {
      this.direction = 'slideLeft';
      console.log('right to left');
    } else if (Math.abs(Y) > Math.abs(X) && Y > 0) {
      this.direction = 'slideDown';
      console.log('top to bottom');
    } else if (Math.abs(Y) > Math.abs(X) && Y < 0) {
      this.direction = 'slideUp';
      console.log('bottom to top');
    } else {
      this.direction = 'touch';
      console.log('just touch');
    }
  }

  private touchend(event: TouchEvent) {
    // 手释放，如果在300毫秒内就释放，则取消长按事件
    if (event.cancelable) {
      event.preventDefault();
    }

    this.EndTime = Date.now();

    if (this.EndTime - this.StartTime < this.interval) {
      this.EndTime = 0;
      this.StartTime = 0;
      console.log('取消');
    } else {
      console.log('松手触发');
      this.$emit('on-move', this.direction);
    }
  }
}
</script>
