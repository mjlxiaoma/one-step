import { ref } from 'vue';
import * as rrweb from 'rrweb';
import rrwebPlayer from 'rrweb-player';
import { eventWithTime } from '@rrweb/types';

export const useRecord = () => {
  const replayer = ref<HTMLElement>(); // 回放DOM
  const showReplay = ref(false); // 显示回放区域
  const eventList = ref<eventWithTime[]>([]); // events集合
  const stopFn = ref(); // 停止录制的方法

  // 录制
  const onRecord = () => {
    stopFn.value = rrweb.record({
      emit: event => {
        console.log(event,);
        
        eventList.value.push(event);
      },
      recordCanvas: true,
      collectFonts: true,
    });
  };
  // 回放
  const onReplay = () => {
    stopFn.value();
    showReplay.value = true;
    console.log(eventList.value,'eventList.value');
    
    // 加个延时确保回放DOM渲染完成
    setTimeout(() => {
      new rrwebPlayer({
        target: replayer.value as HTMLElement,
        props: {
          events: eventList.value,
        },
      });
    }, 500);
  };
  // 返回
  const goBack = () => {
    showReplay.value = false;
    eventList.value = [];
  };

  return {
    replayer,
    showReplay,
    onRecord,
    onReplay,
    goBack,
  };
};
