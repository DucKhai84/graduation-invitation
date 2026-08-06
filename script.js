        const countDownDate = new Date("Aug 9, 2026 08:00:00").getTime();

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
        let autoplayBlocked = false; // Cờ nhận biết trình duyệt chặn tự động phát nhạc

        // Cài đặt thời gian bắt đầu điệp khúc (tính bằng giây). 
        // 38 giây. Bạn có thể thay đổi số này cho khớp với file mp3 của bạn.
        const chorusStartTime = 38;

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
                    autoplayBlocked = false; // Hủy cờ nếu phát thành công

                    // Update buttons to "Pause" state
                    if (playIcon1) playIcon1.innerText = "⏸";
                    if (playText1) playText1.innerText = "Tạm dừng";

                    if (floatingIcon) floatingIcon.innerText = "⏸";
                    if (floatingText) floatingText.innerText = "Tắt nhạc";

                    // Start vinyl spin
                    if (vinyl) vinyl.style.animationPlayState = 'running';
                }).catch(error => {
                    if (error.name === 'NotAllowedError') {
                        // Trình duyệt chặn tự động phát, chờ người dùng click
                        hasStarted = false;
                        autoplayBlocked = true; // Bật cờ bị chặn
                    } else {
                        console.error("Lỗi phát nhạc:", error);
                    }
                });
            }
        }

        if (playBtn1) playBtn1.addEventListener("click", toggleMusic);
        if (floatingBtn) floatingBtn.addEventListener("click", toggleMusic);

        function forcePlayMusic(e) {
            // Bỏ qua nếu người dùng bấm thẳng vào các nút bật nhạc (vì nút đã có hàm riêng)
            if (e && (e.target.closest('#play-btn-1') || e.target.closest('#floating-music-btn'))) {
                return;
            }
            if (!isPlaying) {
                if (!hasStarted) {
                    audio.currentTime = chorusStartTime;
                    hasStarted = true;
                }
                audio.play().then(() => {
                    isPlaying = true;
                    autoplayBlocked = false; // Hủy cờ nếu phát thành công
                    if (playIcon1) playIcon1.innerText = "⏸";
                    if (playText1) playText1.innerText = "Tạm dừng";
                    if (floatingIcon) floatingIcon.innerText = "⏸";
                    if (floatingText) floatingText.innerText = "Tắt nhạc";
                    if (vinyl) vinyl.style.animationPlayState = 'running';
                    
                    // Xóa sự kiện sau khi nhạc đã phát thành công
                    document.removeEventListener('click', forcePlayMusic);
                    document.removeEventListener('touchstart', forcePlayMusic);
                    document.removeEventListener('scroll', forcePlayMusic);
                }).catch(error => {
                    hasStarted = false;
                    autoplayBlocked = true; // Bật cờ bị chặn
                });
            }
        }

        // Bắt sự kiện chạm/click/cuộn bất kỳ đâu trên trang để lách luật autoplay
        document.addEventListener('click', forcePlayMusic);
        document.addEventListener('touchstart', forcePlayMusic);
        document.addEventListener('scroll', forcePlayMusic);

        // Tự động thử phát nhạc khi tải trang
        toggleMusic();

        // Slideshow logic cho Memories Section
        const frames = document.querySelectorAll('.slideshow-frame');
        if (frames.length > 0) {
            let currentFrame = 0;
            setInterval(() => {
                // Fade out current frame
                frames[currentFrame].style.opacity = '0';
                
                // Move to next frame
                currentFrame = (currentFrame + 1) % frames.length;
                
                // Fade in next frame
                frames[currentFrame].style.opacity = '1';
            }, 3000);
        }
