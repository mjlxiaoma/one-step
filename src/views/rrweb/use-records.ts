import { ref } from 'vue';
import * as rrweb from 'rrweb';
import rrwebPlayer from 'rrweb-player';
import { eventWithTime } from '@rrweb/types';
import 'rrweb-player/dist/style.css';

export const useRecord = () => {
    const replayer = ref<HTMLElement>(); // 回放DOM
    const showReplay = ref(false); // 显示回放区域
    const eventList = ref<eventWithTime[]>([]); // events集合
    let stopFn: (() => void) | null = null;
    let player: rrwebPlayer | null = null; // 保存播放器实例
    const isRecording = ref(false);

    // 录制
    const onRecord = () => {
        eventList.value = [];
        isRecording.value = true;
        stopFn = rrweb.record({
            emit: event => {
                console.log('捕获的事件:', event); // 添加日志以调试
                eventList.value.push(event);
            },
            sampling: {
                mousemove: 50, // 鼠标移动事件的采样频率
                scroll: 150, // 滚动事件的采样频率
                media: 800, // 媒体事件的采样频率
            },
            checkoutEveryNms: 10000, // 每10秒检查一次
            maskInputOptions: { password: true }, // 遮罩密码输入框
            inlineStylesheet: true,
            recordCanvas: true,
        });
    };

    // 回放
    const onReplay = () => {
        if (stopFn) {
            stopFn();
            stopFn = null;
        }

        if (eventList.value.length === 0) {
            console.warn('没有可回放的记录');
            return;
        }

        console.log('事件列表:', eventList.value); // 添加调试信息
        showReplay.value = true;

        setTimeout(() => {
            if (replayer.value && eventList.value.length > 0) {
                if (replayer.value.firstChild) {
                    replayer.value.innerHTML = '';
                }

                console.log('初始化 rrwebPlayer'); // 添加调试信息
                player = new rrwebPlayer({
                    target: replayer.value,
                    props: {
                        events: eventList.value,
                        width: 800,
                        height: 450,
                        autoPlay: true,
                        showController: true,
                        mouseTail: false,
                    },
                });
            } else {
                console.warn('replayer 或事件列表无效'); // 添加调试信息
            }
        }, 100);
    };

    // 返回
    const goBack = () => {
        if (stopFn.value) {
            stopFn.value();
            stopFn.value = null;
        }

        // 清理播放器DOM
        if (replayer.value) {
            replayer.value.innerHTML = '';
        }
        player = null;

        showReplay.value = false;
        eventList.value = [];
        isRecording.value = false;
    };

    return {
        replayer,
        showReplay,
        onRecord,
        onReplay,
        goBack,
        isRecording,
        events: eventList,
    };
};
