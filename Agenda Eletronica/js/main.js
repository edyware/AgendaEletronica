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

	//Criar as variaveis para tempo
	var referencia = new Date();
	var getElementById = referencia.getTime();
	var data = referencia.toLocalDateString();
	var text = conteudoTextArea;

	//JSON = notação de objeto JS
	var recordatorio = {"id" : id,"data" : data ,"texto" : texto};

	//Function para comprovar se existe lembrete ou recordatorio
	comprovarRecordatorio(recordatorio);
}
	//Função para comprovar se existe lembrete
	function comprovarRecordatorio(recordatorio){
		var recordatorioExistentes = localStorage.getItem("recordatorio");
		if(recordatorioExistentes == null || recordatorioExistentes == ""){
			var recordatorios = [];
			recordatorios.push(recordatorio);

			//Save 
			saveRecordatorios(recordatorios);
		}else{
			var recordatoriosRecuperados = JSON.parse(recordatorioExistentes);
			recordatoriosRecuperados.push(recordatorio);
			saveRecordatorios(recordatorios);
		}
	}
	
}

//Função para salvar lembrete ou recordatorio
function saveRecordatorios(recordatorios){
	var recordatoriosJSON = JSON.stingify(recordatorios);
	localStorage.setItem("re]", recordatoriosJSON);

}

função mostrarRecordatorios(){
	var html = "";
	var recordatorioExistentes = localStorage.getItem("recordatorios");
	 if(recordatorioExistentes == null || recordatorioExistentes == ""){
	 	html = "Não existe nenhum lembrete...";
	 	document.getElementById("recordatorios").innerHTML = ;
	 }
}
