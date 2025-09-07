/* Lenis Scroll */

const lenis = new Lenis({
	smooth: true,
	multiplier: 1,
	easing: (t) => t * (2 - t),
	smoothTouch: true,
	lerp: 0.05,
	duration: 1.2
});

function raf(time) {
	lenis.raf(time);
	requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.normalizeScroll(true);

/* ANIMATION */

window.addEventListener("DOMContentLoaded", () => {
	const mainText = new SplitType(".text-animation__text", {
		types: "words, chars"
	});
	const secondText = new SplitType(".final__bottom-text", {
		types: "words, chars"
	});

	const words = [...document.querySelectorAll(".text-animation__word")];

	/* Main Text Animation */

	gsap.fromTo(
		mainText.chars,
		{ color: "#ffffff" },
		{
			color: "#06ffff",
			stagger: 0.05,
			scrollTrigger: {
				trigger: ".text-animation__text",
				start: "top bottom",
				end: "bottom center",
				scrub: 1
			}
		}
	);

	/* Image Animation */

	words.forEach((word) => {
		const wrapper = word.querySelector(".text-animation__image-wrapper");
		const revealLeft = wrapper.querySelector(".text-animation__reveal.left");
		const revealRight = wrapper.querySelector(".text-animation__reveal.right");

		if ([wrapper, revealLeft, revealRight].some((el) => !el)) return;

		gsap.set(wrapper, { width: 0 });
		gsap.set([revealLeft, revealRight], { xPercent: 0 });

		ScrollTrigger.create({
			trigger: word,
			start: "top 80%",
			end: "bottom 20%",
			onEnter: () => {
				gsap.to(wrapper, {
					width: "11.2vw",
					duration: 0.5,
					ease: "power2.out"
				});
				gsap.to(revealLeft, {
					xPercent: -100,
					duration: 0.5,
					ease: "power2.out"
				});
				gsap.to(revealRight, {
					xPercent: 100,
					duration: 0.5,
					ease: "power2.out",
					delay: 0.05
				});
			},
			onLeaveBack: () => {
				gsap.to(wrapper, {
					width: 0,
					duration: 0.5,
					ease: "power2.inOut"
				});
				gsap.to(revealLeft, {
					xPercent: 0,
					duration: 0.5,
					ease: "power2.inOut"
				});
				gsap.to(revealRight, {
					xPercent: 0,
					duration: 0.5,
					ease: "power2.inOut",
					delay: 0.05
				});
			}
		});
	});

	/* Second Text Animation */

	gsap.fromTo(
		secondText.chars,
		{ color: "#999999" },
		{
			color: "#ffffff",
			stagger: 0.05,
			scrollTrigger: {
				trigger: ".final__bottom-text",
				start: "top bottom-=15%",
				end: "bottom bottom",
				scrub: 1
			}
		}
	);
});
