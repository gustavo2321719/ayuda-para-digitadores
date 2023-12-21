function modifyFile() {
    const fileInput = document.getElementById('fileInput');
    const selectedOption = document.getElementById('options').value;
    
    const file = fileInput.files[0];
    const reader = new FileReader();
    
    reader.onload = function(event) {
        const content = event.target.result;

        // Variables para almacenar los valores obtenidos
        let numToDelete = '';
        let multipleToDelete = [];

        // Lógica de modificación según la opción seleccionada
        if (selectedOption === 'eliminar-digitaciones') {
            const userInput = prompt(
                'Selecciona una opción:\n1. Eliminar S100\n2. Eliminar FSU'
            );

            switch (userInput) {
                case '1':
                    const quantityToDelete = parseInt(prompt('Indique la cantidad de S100 a eliminar:'));
                    if (!isNaN(quantityToDelete) && quantityToDelete > 0) {
                        for (let i = 0; i < quantityToDelete; i++) {
                            const valueToDelete = prompt(`Ingrese el codigo de la S100 número ${i + 1}:`);
                            multipleToDelete.push(valueToDelete);
                        }
                        const lines = content.split('\n');
                        const modifiedContent = lines.filter(line => !multipleToDelete.some(value => line.includes(value))).join('\n');

                        // Crear un nuevo objeto JSZip
                        const zip = new JSZip();
                        zip.file(file.name, modifiedContent);

                        // Generar el archivo ZIP
                        zip.generateAsync({ type: 'blob' }).then(function(content) {
                            // Crear un enlace de descarga para el archivo ZIP
                            const downloadLink = document.createElement('a');
                            downloadLink.href = URL.createObjectURL(content);
                            downloadLink.download = 'archivo_modificado.zip';
                            document.body.appendChild(downloadLink);
                            downloadLink.click();
                            document.body.removeChild(downloadLink);
                        });
                    } else {
                        alert('La cantidad ingresada no es válida.');
                    }
                    case '2':
                    const quantityToDeletea = parseInt(prompt('Indique la cantidad de FSU a eliminar:'));
                    if (!isNaN(quantityToDeletea) && quantityToDeletea > 0) {
                        for (let i = 0; i < quantityToDeletea; i++) {
                            const valueToDelete = prompt(`Ingrese el codigo de la FSU número ${i + 1}:`);
                            multipleToDelete.push(valueToDelete);
                        }
                        const lines = content.split('\n');
                        const modifiedContent = lines.filter(line => !multipleToDelete.some(value => line.includes(value))).join('\n');

                        // Crear un nuevo objeto JSZip
                        const zip = new JSZip();
                        zip.file(file.name, modifiedContent);

                        // Generar el archivo ZIP
                        zip.generateAsync({ type: 'blob' }).then(function(content) {
                            // Crear un enlace de descarga para el archivo ZIP
                            const downloadLink = document.createElement('a');
                            downloadLink.href = URL.createObjectURL(content);
                            downloadLink.download = 'archivo_modificado.zip';
                            document.body.appendChild(downloadLink);
                            downloadLink.click();
                            document.body.removeChild(downloadLink);
                        });
                    } else {
                        alert('La cantidad ingresada no es válida.');
                    }
                    break;
                // Resto de los casos y lógica
                default:
                    alert('Opción inválida');
                    return;
            }
        } else if (selectedOption === 'eliminar-suministros') {
            // Lógica para eliminar suministros
        } else if (selectedOption === 'cambiar-ubigeo') {
            // Lógica para cambiar ubigeo
        }
    };
    
    reader.readAsText(file);
}
