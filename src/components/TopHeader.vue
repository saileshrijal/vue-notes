<template>
    <div class="row ">
        <div class="col-6">
            <h2 class="text-uppercase">{{ title }}</h2>
        </div>
        <div class="col-6 text-end container-fluid">
            <button class="btn btn-dark" @click="buttonLink">
                <i :class="buttonIcon"></i> {{ buttonText }}
            </button>
        </div>
        <hr />
    </div>
</template>

<script setup>
import { defineProps } from 'vue';
defineProps({
    title: {
        type: String,
        default: 'List of Students'
    },
    buttonText: {
        type: String,
        default: 'Go Back'
    },
    buttonLink: {
        type: String,
        default: '/student'
    },
    buttonIcon: {
        type: String,
        default: 'fa fa-arrow-left'
    }
})
</script>