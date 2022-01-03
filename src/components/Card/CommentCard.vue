<template>
    <div class="comment_card">
        <div class="user_details">
            <div class="user_image">
                <img src="@/assets/userimage.png">
            </div>
            <div class="dets">
                <div class="user_name">
                    John Doe
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
    </div>
</template>

<script>
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
    name: 'comment-card',
    props: ['id', 'user', 'date', 'content', 'replies', 'likes']
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
        font-size: 200%;
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
        height: 50px;
        width: 50px;
        border-radius: 50%;
    }

    .dets {
        margin-left: 2%; 
    }
    .user_name {
        font-weight: 500;
        font-size: 110%;
    }
    .date {
        font-size: 90%;
        color: var(--paper-grey-600);
    }

    .desc {
        margin-top: 5px;
        color: var(--paper-grey-700);
        font-size: 120%;
        overflow: hidden;
        padding: 2% 0;

        display: -webkit-box;
        -webkit-line-clamp: 3;
        line-clamp: 3;
        -webkit-box-orient: vertical;
    }

    .others {
        display: flex;
        align-items: center;
    }
    .others > div {
        border-radius: 15px;
        display: flex;
        align-items: center;
        padding: 2px;
        margin-right: 1%;
        font-weight: 400;
        color: var(--paper-grey-700);
        font-size: 110%;
    }
    .number {
        padding: 0 5px;
    }
</style>