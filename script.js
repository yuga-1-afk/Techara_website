// faq.js

document.querySelectorAll(".faq-question").forEach((btn) => {
    btn.addEventListener("click", function () {
        const answer = this.parentElement.querySelector(".faq-answer");
        const arrow = this.querySelector(".faq-arrow");
        // Close other answers and reset arrows
        document.querySelectorAll(".faq-answer").forEach((el) => {
            if (el !== answer) el.classList.add("hidden");
        });
        document.querySelectorAll(".faq-arrow").forEach((svg) => {
            if (svg !== arrow) svg.style.transform = "rotate(0deg)";
        });
        // Toggle current answer and arrow
        answer.classList.toggle("hidden");
        if (!answer.classList.contains("hidden")) {
            arrow.style.transform = "rotate(180deg)"; // Up arrow
        } else {
            arrow.style.transform = "rotate(0deg)"; // Down arrow
        }
    });
});

document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (e) => {
        const targetId = link.getAttribute("href");
        if (!targetId || targetId === "#") return;
        const target = document.querySelector(targetId);
        if (target) {
            e.preventDefault();
            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: "smooth",
            });
        }
    });
});

const enrollModal = document.getElementById("enrollModal");
const closeEnrollModalButton = document.getElementById("closeEnrollModal");
const thankyouModal = document.getElementById("thankyouModal");
const closeThankyouModalButton = document.getElementById("closeThankyouModal");
const thankyouBackHomeLink = document.getElementById("thankyouBackHome");

const openThankyouModal = () => {
    if (!thankyouModal) return;
    thankyouModal.classList.remove("hidden");
    thankyouModal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
};

const closeThankyouModal = () => {
    if (!thankyouModal) return;
    thankyouModal.classList.add("hidden");
    thankyouModal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
};

if (enrollModal) {
    const openEnrollModal = () => {
        enrollModal.classList.remove("hidden");
        enrollModal.setAttribute("aria-hidden", "false");
        document.body.classList.add("modal-open");
    };

    const closeEnrollModal = () => {
        enrollModal.classList.add("hidden");
        enrollModal.setAttribute("aria-hidden", "true");
        document.body.classList.remove("modal-open");
    };

    document.querySelectorAll('[data-open-enroll="true"]').forEach((link) => {
        link.addEventListener("click", (event) => {
            event.preventDefault();
            openEnrollModal();
        });
    });

    if (closeEnrollModalButton) {
        closeEnrollModalButton.addEventListener("click", closeEnrollModal);
    }

    enrollModal.addEventListener("click", (event) => {
        if (event.target === enrollModal) {
            closeEnrollModal();
        }
    });

    document.addEventListener("keydown", (event) => {
        if (
            event.key === "Escape" &&
            !enrollModal.classList.contains("hidden")
        ) {
            closeEnrollModal();
        }
    });
}

if (thankyouModal) {
    if (closeThankyouModalButton) {
        closeThankyouModalButton.addEventListener("click", closeThankyouModal);
    }

    if (thankyouBackHomeLink) {
        thankyouBackHomeLink.addEventListener("click", () => {
            closeThankyouModal();
        });
    }

    thankyouModal.addEventListener("click", (event) => {
        if (event.target === thankyouModal) {
            closeThankyouModal();
        }
    });

    document.addEventListener("keydown", (event) => {
        if (
            event.key === "Escape" &&
            !thankyouModal.classList.contains("hidden")
        ) {
            closeThankyouModal();
        }
    });
}

const mobileMenuButton = document.getElementById("mobileMenuButton");
const mobileMenu = document.getElementById("mobileMenu");

if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener("click", () => {
        const isNowHidden = mobileMenu.classList.toggle("hidden");
        mobileMenuButton.setAttribute("aria-expanded", String(!isNowHidden));
    });

    mobileMenu.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            mobileMenu.classList.add("hidden");
            mobileMenuButton.setAttribute("aria-expanded", "false");
        });
    });

    document.addEventListener("click", (event) => {
        const clickTarget = event.target;
        if (
            !mobileMenu.classList.contains("hidden") &&
            clickTarget instanceof Node &&
            !mobileMenu.contains(clickTarget) &&
            !mobileMenuButton.contains(clickTarget)
        ) {
            mobileMenu.classList.add("hidden");
            mobileMenuButton.setAttribute("aria-expanded", "false");
        }
    });
}

document.querySelectorAll(".ig-video-only").forEach((card) => {
    if (card.querySelector(".ig-control-btn")) return;

    const video = card.querySelector("video");
    if (!video) return;

    video.autoplay = false;
    video.controls = false;
    video.playsInline = true;
    video.preload = "metadata";

    const playBtn = document.createElement("button");
    playBtn.type = "button";
    playBtn.className = "ig-control-btn";
    playBtn.setAttribute("aria-label", "Play video");
    playBtn.innerHTML =
        '<span class="material-symbols-outlined" aria-hidden="true">play_arrow</span>';

    const muteBtn = document.createElement("button");
    muteBtn.type = "button";
    muteBtn.className = "ig-mute-btn";
    muteBtn.setAttribute("aria-label", "Mute video");
    muteBtn.innerHTML =
        '<span class="material-symbols-outlined" aria-hidden="true">volume_up</span>';

    const updatePlayIcon = () => {
        const isPlaying = !video.paused && !video.ended;
        playBtn.style.display = isPlaying ? "none" : "inline-flex";
        playBtn.setAttribute(
            "aria-label",
            isPlaying ? "Pause video" : "Play video",
        );
        playBtn.innerHTML = isPlaying
            ? '<span class="material-symbols-outlined" aria-hidden="true">pause</span>'
            : '<span class="material-symbols-outlined" aria-hidden="true">play_arrow</span>';
    };

    const updateMuteIcon = () => {
        const isMuted = video.muted;
        muteBtn.setAttribute(
            "aria-label",
            isMuted ? "Unmute video" : "Mute video",
        );
        muteBtn.innerHTML = isMuted
            ? '<span class="material-symbols-outlined" aria-hidden="true">volume_off</span>'
            : '<span class="material-symbols-outlined" aria-hidden="true">volume_up</span>';
    };

    playBtn.addEventListener("click", async () => {
        if (video.paused || video.ended) {
            try {
                await video.play();
            } catch (error) {
                // Playback can be blocked by browser policies.
                console.warn("Video play was blocked", error);
            }
        } else {
            video.pause();
        }
    });

    video.addEventListener("click", async () => {
        if (video.paused || video.ended) {
            try {
                await video.play();
            } catch (error) {
                console.warn("Video play was blocked", error);
            }
            return;
        }

        video.pause();
    });

    muteBtn.addEventListener("click", () => {
        video.muted = !video.muted;
        updateMuteIcon();
    });

    video.addEventListener("play", updatePlayIcon);
    video.addEventListener("pause", updatePlayIcon);
    video.addEventListener("ended", updatePlayIcon);

    video.muted = false;
    updatePlayIcon();
    updateMuteIcon();

    card.appendChild(playBtn);
    card.appendChild(muteBtn);
});

const form = document.getElementById("counselingForm");

if (form) {
    const fullNameInput = document.getElementById("fullName");
    const emailInput = document.getElementById("email");
    const phoneInput = document.getElementById("phone");
    const qualificationInput = document.getElementById("qualification");
    const programSelect = document.getElementById("program");

    const fullNameError = document.getElementById("fullNameError");
    const emailError = document.getElementById("emailError");
    const phoneError = document.getElementById("phoneError");
    const qualificationError = document.getElementById("qualificationError");
    const programError = document.getElementById("programError");

    const clearErrors = () => {
        [
            fullNameError,
            emailError,
            phoneError,
            qualificationError,
            programError,
        ].forEach((el) => {
            if (!el) return;
            el.textContent = "";
            el.classList.add("hidden");
        });
    };

    form.addEventListener("submit", async function (e) {
        e.preventDefault();

        clearErrors();

        const fullName = fullNameInput.value.trim();
        const email = emailInput.value.trim();
        const phone = phoneInput.value.trim();
        const qualification = qualificationInput.value.trim();
        const program = programSelect.value;

        let hasError = false;

        if (!fullName) {
            fullNameError.textContent = "Please enter your full name.";
            fullNameError.classList.remove("hidden");
            hasError = true;
        }

        if (!email) {
            emailError.textContent = "Email is required.";
            emailError.classList.remove("hidden");
            hasError = true;
        } else {
            // Must contain '@' and end with '.com'
            const emailPattern = /^[^\s@]+@[^\s@]+\.com$/i;
            if (!emailPattern.test(email)) {
                emailError.textContent =
                    "Please enter a valid email ending with .com (e.g. name@example.com).";
                emailError.classList.remove("hidden");
                hasError = true;
            }
        }

        const numericPhone = phone.replace(/\D/g, "");
        if (!phone) {
            phoneError.textContent = "Phone number is required.";
            phoneError.classList.remove("hidden");
            hasError = true;
        } else if (numericPhone.length !== 10) {
            phoneError.textContent =
                "Please enter a valid 10‑digit mobile number.";
            phoneError.classList.remove("hidden");
            hasError = true;
        }

        if (!qualification) {
            qualificationError.textContent =
                "Please mention your qualification.";
            qualificationError.classList.remove("hidden");
            hasError = true;
        }

        if (!program) {
            programError.textContent = "Please select a program.";
            programError.classList.remove("hidden");
            hasError = true;
        }

        if (hasError) {
            return;
        }

        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText =
            submitBtn.getAttribute("data-original-text") ||
            submitBtn.textContent.trim();

        // Disable button + show spinner
        submitBtn.disabled = true;
        submitBtn.classList.add("opacity-70", "cursor-not-allowed");
        submitBtn.innerHTML = `
            <span class="inline-flex items-center justify-center gap-2 w-full">
                <span class="h-4 w-4 border-2 border-white/40 border-t-white rounded-full animate-spin"></span>
                <span>Submitting...</span>
            </span>
        `;

        const data = {
            fullName,
            email,
            phone,
            qualification,
            program,
        };

        try {
            const response = await fetch(
                "https://script.google.com/macros/s/AKfycbwm_RZT5z4GSG1FG0xGgcYxgCw0myjy8bdhcVMUfJe-Z0YIwyOCM6cVS-77G3mYi7o/exec",
                {
                    method: "POST",
                    body: JSON.stringify(data),
                },
            );

            const result = await response.json();

            if (result.result === "success") {
                if (enrollModal) {
                    enrollModal.classList.add("hidden");
                    enrollModal.setAttribute("aria-hidden", "true");
                }
                form.reset();
                submitBtn.disabled = false;
                submitBtn.classList.remove("opacity-70", "cursor-not-allowed");
                submitBtn.innerHTML = originalText;
                openThankyouModal();
            } else {
                throw new Error("Submission failed");
            }
        } catch (error) {
            // Show a generic error near the button, fallback to alert if needed
            alert("Something went wrong! Please try again.");
            submitBtn.disabled = false;
            submitBtn.classList.remove("opacity-70", "cursor-not-allowed");
            submitBtn.innerHTML = originalText;
        }
    });
}
