let container = document.getElementById('container')

toggle = () => {
	container.classList.toggle('sign-in')
	container.classList.toggle('sign-up')
}

setTimeout(() => {
	container.classList.add('sign-in')
}, 200)



const button = document.getElementById("register");
button.addEventListener('click',()=>{
	const name= document.getElementById("name").value;
	const email = document.getElementById("email").value;
	const password = document.getElementById("password").value;

	let url = 'http://localhost:3000/register';
	axios.post(url,{
		name: name,
		email: email,
		password: password
	})
	.then(function(res){
		console.log(res)
	})
	.catch(function(error){
		console.log(error)
	})

})
