<template>
    <div>
        <response-view-form
            v-if="!formEditVisible"
            :response="response"
            :key="response.id"
            @edit="showEditForm"
            @inviteInterview="showInterviewDialog"
        />

        <response-edit-form
            v-if="formEditVisible"
            :response="response"
            :key="response.id"
            @save="editResponse"
            @cancel="hideEditForm"
        />
    </div>
</template>

<script>
import ResponseEditForm from "@/components/ResponseEditForm.vue";
import ResponseViewForm from "@/components/ResponseViewForm.vue";
import useEditResponse from "@/hooks/useEditResponse"

export default {
    components: {
        ResponseEditForm,
        ResponseViewForm
    },
    props: {
        response: {
            type: Object,
            required: true,
        },
    },
    methods: {
        showInterviewDialog() {
            this.$emit('interview', this.response)
        },
    },
    setup(props) {
        const { editResponse, hideEditForm, showEditForm, formEditVisible } = useEditResponse()
        return {
            editResponse,
            hideEditForm,
            showEditForm,
            formEditVisible
        }
    }
};
</script>

<style scoped></style>
