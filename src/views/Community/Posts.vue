<template>
    <div class="community_posts">
        <div class="main">
            <div class="head">
                <div class="title">
                    All Discussions
                </div>
                
                <div class="create_new_btn_wrapper">
                    <ButtonIconText 
                        buttonText="Add Post"
                        buttonIcon="plus"
                        @buttonAction="gotocreateform()"
                    /> 
                </div>
            </div>

            <div class="posts_list_frame">
                <PostCard 
                    v-for="post in posts"
                    :key="post._id"
                    :id="post._id"
                    :title="post.title"
                    :user="post.user"
                    :date="post.dateCreated"
                    :languages="post.languages"
                    :description="post.desc"
                    :comments="post.comments"
                    :likes="post.likes"
                />
            </div>
        </div>
        <div class="related">
        </div>
    </div>
</template>

<script>
import { defineComponent } from "@vue/runtime-core";
import Header from "@/components/Header/Header.vue";
import SiteFooter from "@/components/SiteFooter.vue";
import ButtonIconText from "@/components/buttons/ButtonIconText.vue";
import PostCard from "@/components/Card/PostCard.vue";
import DropDown from '@/components/DropDown/DropDown.vue';

export default defineComponent({
    components: { Header, SiteFooter, ButtonIconText, PostCard, DropDown },
    data() {
        return {
            posts: [],
            optionsVisible: [false],
        }
    },
    methods: {
        fetchposts() {
            this.$store.dispatch('fetchcommunityposts')
            .then((response)=> {
                this.posts = response.reverse();
            })
            .catch((error)=> {
                console.log(error.response);
            });
        },
        selectOption(selected) {
            
            if(selected.dropdownIndex == 0) {
                this.languages.selectedIndex = selected.optionIndex;
                this.languages.selected = true;
                this.languages.selectedOption = this.languages.options[selected.optionIndex].value;

                this.storeCommunityLanguage();
                this.fetchposts();
            }
       
            this.toggleOptionsVisibility(selected.dropdownIndex);
        },
        toggleOptionsVisibility(index) {
            this.optionsVisible[index] = !this.optionsVisible[index];
        },
        gotocreateform() {
            this.$router.push('new');
        },
    },
    async beforeMount() {
        this.fetchposts();
    }
})
</script>

<style scoped>
    .community_posts {
    }
    .main {
        width: 70%;
        margin: 0 auto;
    }
    .community_posts .head {
        display: flex;
    }
    .head .title {
        font-size: 150%;
        font-weight: 600;
        color: var(--paper-grey-600);
    }

    .dropdown_wrapper {
        margin-left: auto;
        width: 18%;
        height: 35px;
    }
    .dropdown_wrapper:deep > * {
        font-size: 120%;
    }

    .create_new_btn_wrapper {
        margin-left: auto;
        width: 15%;
        height: 40px;
    }
    .create_new_btn_wrapper button {
        border: none;
        background: var(--burgundy-200);
        color: white;
        border-radius: 5px;
        outline: none;
    }
    
    .posts_list_frame {
        margin-top: 5%;
    }
    .posts_list_frame > * {
        margin-bottom: 5%;
    }
</style>