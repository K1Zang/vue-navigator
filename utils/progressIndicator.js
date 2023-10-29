const DELAY = 500;
const DURATION = 2e3;
const THROTTLE = 200;

export default function progressIndicator() {
    const progress = ref(0);
    const isLoading = ref(false);
    const isShow = ref(false);
    const step = computed(() => 1e4 / DURATION);
    let _timer = null;
    let _throttle = null;

    function start() {
        clear();
        progress.value = 0;
        isLoading.value = true;

        setTimeout(() => {
            if (isLoading.value) isShow.value = true;
        }, DELAY);

        if (THROTTLE) {
            if (process.client) {
                _throttle = setTimeout(_startTimer, THROTTLE);
            }
        } else {
            _startTimer();
        }
    }

    function finish() {
        progress.value = 100;
        _hide();
    }

    function clear() {
        clearInterval(_timer);
        clearTimeout(_throttle);
        _timer = null;
        _throttle = null;
    }

    function _increase(num) {
        progress.value = Math.min(100, progress.value + num);
    }

    function _hide() {
        clear();
        if (process.client) {
            setTimeout(() => {
                isLoading.value = false;
                isShow.value = false;
                setTimeout(() => {
                    progress.value = 0;
                }, 400);
            }, 500);
        }
    }

    function _startTimer() {
        if (process.client) {
            _timer = setInterval(() => {
                _increase(step.value);
            }, 100);
        }
    }

    return {
        progress,
        isLoading,
        isShow,
        start,
        finish,
        clear
    };
}
