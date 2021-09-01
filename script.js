(() => {
	const actions = {
		birdFlies(key) {
			if (key) {
				document.querySelector('[data-index="2"] .bird').style.transform = `translateX(${window.innerWidth}px)`;
			} else {
				document.querySelector('[data-index="2"] .bird').style.transform = `translateX(-100%)`;
			}
		},
		birdFlies2(key) {
			if (key) {
				document.querySelector('[data-index="5"] .bird').style.transform = `translate(${window.innerWidth}px, ${-window.innerHeight * 0.7}px)`;
			} else {
				document.querySelector('[data-index="5"] .bird').style.transform = `translateX(-100%)`;
			}
		}
	}

	const stepEl = document.querySelectorAll('.step');
	const graphicEl = document.querySelectorAll('.graphic-item');
	let currentItem = graphicEl[0]; // 현재 활성화된 (visible class가 붙은 .graphic-item)
	let ioIndex;

	// IntersectionObserver = 어떤요소가 지금 눈에 보이는지 안보이는지 체크
	const io = new IntersectionObserver((entries, observer) => {
		ioIndex = entries[0].target.dataset.index * 1;
	})

	for(let i=0; i<stepEl.length; i++) {
		io.observe(stepEl[i])
		
		// stepEl[i].setAttribute('data-index', i);
		stepEl[i].dataset.index = i
		graphicEl[i].dataset.index = i
	}
	
	function activate(action) {
		currentItem.classList.add('visible');
		if(action) {
			actions[action](true);
		}
	}
	
	function inactivate(action) {
		currentItem.classList.remove('visible');
		if(action) {
			actions[action](false);
		}
	}
	
	window.addEventListener('scroll', () => {
		let step;
		let boundingRect;

		// for(let i=0; i<stepEl.length; i++) {
			for(let i = ioIndex -1 ; i < ioIndex + 2; i++) {
			step = stepEl[i];
			if (!step) continue; 

			boundingRect = step.getBoundingClientRect();

			if (boundingRect.top > window.innerHeight * 0.1 && 
				boundingRect.top < window.innerHeight * 0.8) {
					
				inactivate(currentItem.dataset.action);
				currentItem = graphicEl[step.dataset.index];
				activate(currentItem.dataset.action);
			}
		}
	})

	window.addEventListener('load', () => {
		setTimeout(() => scrollTo(0, 0),100) ;
	})

	activate();
})();

