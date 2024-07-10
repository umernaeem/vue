<template>
    <section id="Welcome" class="container text-primary py-12">
        <h1 class="text-center font-bold text-4xl">Welcome to Cake days app</h1>
        <h2 class="font-semibold text-lg">Select input file</h2>
        <form class="flex items-center space-x-6" >
            <label class="block">
                <span class="sr-only">Choose profile photo</span>
                <input @change="handleFileUpload( $event )" accept=".txt" type="file" class="block w-full text-sm text-slate-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-violet-50 file:text-primary
                hover:file:bg-secondary hover:file:text-primary
                "/>
            </label>
            <button type="button" class="rounded-md bg-primary px-3 py-2 text-sm font-semibold text-secondary shadow-sm hover:bg-secondary hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary" @click="submitFile">Upload</button>
        </form>
    </section>
    <Modal :modalActive="modalActive" class="text-center">
        <h3 class="font-semibold text-lg mb-4">Uploading your data</h3>
        <ul class="max-w-md space-y-2 text-gray-500 list-inside dark:text-gray-400">
            <li v-if="uploadSuccess" class="flex items-center">
                <svg class="w-4 h-4 me-2 text-green-500 dark:text-green-400 flex-shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
                </svg>
                Data Inserted Successfully
            </li>

            <li v-if="uploadError" class="flex items-center">
                <svg class="w-5 h-5 me-2 text-red-500 dark:text-red-400 flex-shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                    <path fill-rule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm7.707-3.707a1 1 0 0 0-1.414 1.414L10.586 12l-2.293 2.293a1 1 0 1 0 1.414 1.414L12 13.414l2.293 2.293a1 1 0 0 0 1.414-1.414L13.414 12l2.293-2.293a1 1 0 0 0-1.414-1.414L12 10.586 9.707 8.293Z" clip-rule="evenodd"/>
                </svg>
                {{ uploadError }}
            </li>
            
            <li v-if="uploading" class="flex items-center">
                <div role="status">
                    <svg aria-hidden="true" class="w-4 h-4 me-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/></svg>
                    <span class="sr-only">Loading...</span>
                </div>
                Uploading your file
            </li>
        </ul>
    </Modal>
</template>

<script setup>
import {onMounted, ref, reactive } from "vue"
import {uploadFile} from "../../http/cakeday-api"

import Modal from '../sections/Modal.vue';
const modalActive = ref(null);
const uploadError = ref(null);
const uploadSuccess = ref(null);
const uploading = ref(true);
const textFile = ref(null);
const props = defineProps(['data'])
const keyIndex = reactive(props.data)
const handleFileUpload =  event => {
    textFile.value = event.target.files[0];
}
const submitFile = () => {
    
    if(!textFile.value)
    {
        alert("No File Selected");
        return;
    }
    modalActive.value = true;
    uploading.value = true;
    let formData = new FormData();
    
    formData.append('file', textFile.value);
    
    uploadFile(
        formData,
        {
            headers: {
                    'Content-Type': 'multipart/form-data'
            }
        }
    ).then(function(res){
        
        setTimeout(() => uploading.value = false, 1000);
        
        if(res.data.success)
        {
            keyIndex.count++;
            setTimeout(() => uploadSuccess.value = true, 1000);
            setTimeout(() => modalActive.value = false, 3000);
        }
        else if(res.data.error)
        {
            uploadError.value = res.data.description;
            setTimeout(() => modalActive.value = false, 3000);
        }
        
    })
    .catch(function(res){
        setTimeout(() => uploading.value = false, 3000);
        uploadError.value = "File Type Error";
        setTimeout(() => modalActive.value = false, 3000);
    });
}
</script>
