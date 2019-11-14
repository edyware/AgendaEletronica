document.addEventListener('DOMContentLoaded', function(){
	console.log("this work");

	document.getElementById("buttonSave").onclick = createRecordatorio;
});

//Função para verificar se o arquivo é texto
function textoValido(texto){
	if (texto == null || texto == "" || texto.lenght < 1){
		return false;	
	}else {
		return true;
	}
}

//Função para exibir os erros
function mostrarError(){
	var html = "";
	html += '<div class="alert alert-danger" role="alert">';
	html += 'Por favor, insira algum texto';
	html += '</div>';

	document.getElementById('error').innerHTML = html;
	mostrarError();
}

//Função para limpar o alerta de erro
function limparError(){
	
	document.getElementById('error').innerHTML = "";
}

//Função para criar o lembrete
function createRecordatorio(){
	var conteudoTextArea = document.getElementById("texto").value;
	if(!textoValido(conteudoTextArea)){
		mostrarError();
		return;			
	}
	limparError(); 
}