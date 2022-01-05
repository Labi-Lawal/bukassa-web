<template>
    <div class="comment_card">
        <div class="user_details">
            <div class="user_image">
                <img src="@/assets/userimage.png">
            </div>
            <div class="dets">
                <div class="user_name">
                    {{ userData.fullname }}
                </div>
                <div class="date">
                    13 days ago
                </div>
            </div>
        </div>
        
        <div class="desc">
            {{ content }}
        </div>

        <div class="others">
            <div class="likes">
                <div class="number">
                    {{ likes.length }}
                </div>
                <div class="label">Likes</div>
            </div>
            <div class="comments">
                <div class="number">
                    {{ replies.length }}
                </div>
                <div class="label">replies</div>
            </div>
        </div>

        <CommentCard 
            v-for="comments in replies"
            :key="comments._id"
            :id="comments._id"
            :user="comments.user"
            :date="comments.date"
            :content="comments.content"
            :replies="comments.replies"
            :likes="comments.likes"
        />
    </div>
</template>

<script>
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
    name: 'comment-card',
    props: ['id', 'user', 'date', 'content', 'replies', 'likes'],
    data() {
        return {
            userData: ''
        }
    },
    mounted() {

        this.$store.dispatch('fetchuser', this.user)
        .then((userdata)=> this.userData = userdata )
        .catch((error)=> console.log(error));
    }
});
</script>

<style scoped>
    .comment_card {
        border-bottom: 1px solid var(--paper-grey-300); 
        padding: 3%;
        transition: 0.5s;
    }
    .comment_card:last-child {
        border: none;
    }

    .comment_title {
        height: 15%;
        font-size: 180%;
        font-weight: 600;
        color: var(--paper-grey-800);
        display: flex;

        display: -webkit-box;
        -webkit-line-clamp: 1;
        line-clamp: 1;
        -webkit-box-orient: vertical;
    }

    .user_details {
        display: flex;
        align-items: center;
    }
    
    .user_image {
        height: 40px;
        width: 40px;
        border-radius: 50%;
    }

    .dets {
        margin-left: 2%; 
    }
    .user_name {
        font-weight: 500;
        font-size: 90%;
        text-transform: capitalize;
    }
    .date {
        font-size: 90%;
        color: var(--paper-grey-600);
    }

    .desc {
        margin-top: 5px;
        color: var(--paper-grey-700);
        font-size: 100%;
        overflow: hidden;
        padding: 2% 0;
    }

    .others {
        display: flex;
        align-items: center;
    }
    .others > div {
        border-radius: 15px;
        display: flex;
        align-items: center;
        margin-right: 1%;
        font-weight: 400;
        color: var(--paper-grey-700);
        font-size: 90%;
    }
    .number {
        padding: 0 5px 0 0;
    }
</style>