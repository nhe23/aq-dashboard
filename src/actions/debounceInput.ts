export function debounceInput(node) {
  let val='';
	let timer;

  const debounce = v => {
		clearTimeout(timer);
		timer = setTimeout(() => {
      val = v;
      node.dispatchEvent(new CustomEvent('newvalue', {
        detail: val
      }));
		}, 250);
  }
  
	function handleInput(event) {
    console.log("handle input")
    debounce(event.target.value)
	}

	
	node.addEventListener('input', handleInput);

	return {
		destroy() {
			node.removeEventListener('input', handleInput);
		}
	};
}