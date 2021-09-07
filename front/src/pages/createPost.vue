<template>
    <div class="pt-4 container create-post d-flex">
        <div class="card create-post--right-column px-3 py-3">
            <h3 class="mb-4">Create post</h3>
            <form>
                <div class="mb-3">
                    <label for="title" class="form-label">Title: </label>
                    <input v-model="title" required class="form-control" id="title">
                </div>
                <div class="mb-3">
                    <label for="content" class="form-label">Content: </label>
                    <input v-model="content" required class="form-control" id="content">
                </div>
                <div class="mb-3">
                    <label for="typePost" class="form-label">Post type: </label>
                    <select v-model="typePost" id="typePost" selected="active" class="form-select" aria-label="Select post type">
                        <option value="active">Active</option>
                        <option value="important">Important</option>
                        <option value="canceled">Canceled</option>
                    </select>
                </div>
                <div class="mb-3">
                    <label for="typeUser" class="form-label">User type: </label>
                    <select v-model="typeUser" id="typeUser" selected="user" class="form-select" aria-label="Select user type">
                        <option value="user">User</option>
                        <option value="manager">Manager</option>
                        <option disabled value="admin">Admin</option>
                    </select>
                </div>
                <div class="mb-4">
                    <label class="form-label mb-2">Post image: </label>
                    <div class="create-post--image card-profile--image">
                        <div @click="handleToggleImage" class="create-post--image-picker card-profile--image-settings">
                            <font-awesome-icon icon="camera" color="white" />
                        </div>
                    </div>
                </div>
                <button type="submit" class="btn btn-primary">Save post</button>
            </form>
        </div>
    </div>
</template>

<script>
    import './style.sass'

    export default {
        data() {
          return {
              title: '',
              content: '',
              typePost: 'active',
              typeUser: 'user'
          }
        },
        methods: {
            handleToggleImage() {}
        }
    }
</script>