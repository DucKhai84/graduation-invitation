        const countDownDate = new Date("Aug 30, 2026 08:00:00").getTime();

        const x = setInterval(function () {
            const now = new Date().getTime();
            const distance = countDownDate - now;

            if (distance < 0) {
                clearInterval(x);
                document.getElementById("days").innerText = "00";
                document.getElementById("hours").innerText = "00";
                document.getElementById("minutes").innerText = "00";
                document.getElementById("seconds").innerText = "00";
                return;
            }

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            document.getElementById("days").innerText = days < 10 ? "0" + days : days;
            document.getElementById("hours").innerText = hours < 10 ? "0" + hours : hours;
            document.getElementById("minutes").innerText = minutes < 10 ? "0" + minutes : minutes;
            document.getElementById("seconds").innerText = seconds < 10 ? "0" + seconds : seconds;
        }, 1000);
        const audio = document.getElementById("bg-music");
        const playBtn1 = document.getElementById("play-btn-1");
        const playIcon1 = document.getElementById("play-icon-1");
        const playText1 = document.getElementById("play-text-1");

        const floatingBtn = document.getElementById("floating-music-btn");
        const floatingIcon = document.getElementById("floating-music-icon");
        const floatingText = document.getElementById("floating-music-text");
        const vinyl = document.querySelector('.vinyl');

        let isPlaying = false;
        let hasStarted = false; // Theo dõi xem nhạc đã được bật lần nào chưa

        // Cài đặt thời gian bắt đầu điệp khúc (tính bằng giây). 
        // 64 giây = 1 phút 04 giây. Bạn có thể thay đổi số này cho khớp với file mp3 của bạn.
        const chorusStartTime = 64;

        // Start vinyl as paused until music plays
        if (vinyl) vinyl.style.animationPlayState = 'paused';

        function toggleMusic() {
            if (isPlaying) {
                audio.pause();
                isPlaying = false;

                // Update buttons to "Play" state
                if (playIcon1) playIcon1.innerText = "▶";
                if (playText1) playText1.innerText = "Phát bài hát";

                if (floatingIcon) floatingIcon.innerText = "🎵";
                if (floatingText) floatingText.innerText = "Bật nhạc";

                // Stop vinyl spin
                if (vinyl) vinyl.style.animationPlayState = 'paused';
            } else {
                // Nếu là lần đầu tiên bấm play, nhảy đến đoạn điệp khúc
                if (!hasStarted) {
                    audio.currentTime = chorusStartTime;
                    hasStarted = true;
                }

                audio.play().then(() => {
                    isPlaying = true;

                    // Update buttons to "Pause" state
                    if (playIcon1) playIcon1.innerText = "⏸";
                    if (playText1) playText1.innerText = "Tạm dừng";

                    if (floatingIcon) floatingIcon.innerText = "⏸";
                    if (floatingText) floatingText.innerText = "Tắt nhạc";

                    // Start vinyl spin
                    if (vinyl) vinyl.style.animationPlayState = 'running';
                }).catch(error => {
                    alert("Không tìm thấy file nhạc! Bạn vui lòng tải một file nhạc mp3, đổi tên thành '22-taylor-swift.mp3' và để chung thư mục với file index.html nhé.");
                });
            }
        }

        if (playBtn1) playBtn1.addEventListener("click", toggleMusic);
        if (floatingBtn) floatingBtn.addEventListener("click", toggleMusic);
