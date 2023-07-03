<script setup lang="ts">
import { config } from '../settings/site-settings';
import Image1 from '../assets/img/back.png';

const skillSet = [
    { name: "ロボット学会賞, デザイン賞", by: "RobocupJuniorJapanOpen", since: "2022" },
    { name: "2nd", by: "Robocup Aisa-Apsific (Junior Soccer Open)", since: "2021" },
    { name: "採択", by: "サイエンスキャッスル研究費 THK賞", since: "2021" },
    { name: "RookieGameChangerAward", by: "FIRST Robotics Competition Infinite ReCharge", since: "2021" },
    { name: "Best Team Description paper award, Individual 4th", by: "RoboCup Word Wide (Junior Soccer Open)", since: "2021" },
    { name: "Open 2位", by: "RobocupJuniorJapanOpen", since: "2021" },
    { name: "Open 準優勝", by: "ロボカップジュニア・京滋奈ブロック大会", since: "2021" },
    { name: "2nd Prize", by: "RoboMaster", since: "2020" },
    { name: "Most Popular Poster in Open", by: "RoboCupJunior Soccer Virtual Poster Session", since: "2020" },
    { name: "入選3等", by: "第64回日本学生科学賞", since: "2020" },
    { name: "Open 優勝", by: "ロボカップジュニア・京滋奈ブロック大会", since: "2020" },
    { name: "Open 準優勝", by: "関西オープン", since: "2019" },
    { name: "LightWeight4位", by: "BIWAKOオープン", since: "2018" },
    { name: "LightWeight4位,SuperTeam優勝", by: "せとうちオープン", since: "2018" },
    { name: "NIPPON League サッカー ビギナーズ 予選12位", by: "ロボカップジュニア・ジャパンオープン2018和歌山", since: "2018" },
    { name: "Classic部門 優勝", by: "SRC@国際ロボット展", since: "2017" },
    { name: "全国予選 8位", by: "SRC13", since: "2016" },
    { name: "2等賞「オクラに見つけた水玉の正体」", by: "第53回自然科学観察コンクール", since: "2012" },
];
const works = [
    {
        image: Image1,
        title: "Scorpion ver.2023",
        desc: "RobocupJapnOpen2023に出場した機体です．",
        prizes: ["RSJ賞", "デザイン賞"]
    },
    // ...他の作品
];

const meta = ref({ title: "About" });

useIndexHead(meta.value);
</script>

<template>
    <main class="main">
        <div class="card">
            <div class="card-after">
                <div class="box">
                    <div class="avatar">
                        <img src="../assets/img/avatar.png" alt="Avatar" />
                    </div>
                    <div class="info">
                        <h1 class="name">Aktioshi Saeki</h1>
                        <h2 class="abst">Engineer, Student</h2>
                        <p class="desc">ロボットを作るのが大好きな大学生です．</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="content">
            <h2 class="content-sec">About this page</h2>
            <hr class="content-sec-line" noshade="" />
            <p>このブログ(akitoshi-lab.com)は，@konoe_aktoshiが日常で感じたことやひらめいたことを書いている”メモ帳”です．</p>
            <p>もちろん，技術的なことも書きますが，必ずしも正しいとは限りません．私が小さい脳で一生懸命考えてやったことの備忘録です．</p>
        </div>
        <div class="content">
            <h2 class="content-sec">Works</h2>
            <hr class="content-sec-line" noshade="" />
            <div class="works-grid">
                <div class="work-card" v-for="(work, index) in works" :key="index">
                    <img :src="work.image" alt="work image" class="work-image" />
                    <div class="work-details">
                        <h3 class="work-title">{{ work.title }}</h3>
                        <p class="work-desc">{{ work.desc }}</p>
                        <div class="work-prizes">
                            <font-awesome-icon :icon="['fas', 'award']" class="award-icon" />
                            <ul class="prizes-list">
                                <li v-for="(prize, index) in work.prizes" :key="index">{{ prize }}</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="content">
            <h2 class="content-sec">Profile🛡️</h2>
            <hr class="content-sec-line" noshade="" />
            <details class="profile">
                <summary>📌</summary>
                <h3 class="profile-sec">Affiliated</h3>
                <hr class="profile-sec-line" noshade="" />
                <p>電気通信大学</p>
                <p>MMA</p>
                <p>Scramble</p>
                <h3 class="profile-sec">Prize</h3>
                <hr class="profile-sec-line" noshade="" />
                <table class="prize-table">
                    <thead>
                        <tr>
                            <th>年度</th>
                            <th>イベント名</th>
                            <th>受賞内容</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in skillSet" :key="item.name">
                            <td>{{ item.since }}</td>
                            <td>{{ item.by }}</td>
                            <td>{{ item.name }}</td>
                        </tr>
                    </tbody>
                </table>
            </details>
        </div>
    </main>
</template>

<style scoped>
.main {
    position: relative;
    width: 720px;
    margin: 0 auto;
    padding-top: 40px;
    padding-bottom: 50px;
    /* font-family: Arial, sans-serif; */
    line-height: 1.5;
}

.card {
    width: 100%;
    background-image: url("../assets/img/back.png");
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    border-radius: 10px;
    margin-bottom: 40px;
}

.card-after {
    height: 100%;
    width: 100%;
    background: rgba(0, 0, 0, 0.6);
    border-radius: 10px;
}

.box {
    padding: 5% 5%;
    display: flex;
    justify-content: center;
}

.info {
    margin-left: 5%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
}

.name {
    color: aliceblue;
    font-size: 60px;
    margin-bottom: 2%;
}

.abst {
    color: aliceblue;
    font-size: 20px;
    margin-bottom: 5%;
}

.desc {
    color: aliceblue;
    font-size: 14px;
    margin-bottom: 5%;
}

.avatar {
    border-radius: 50%;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.3);
}

@media (max-width: 1024px) {
    .main {
        max-width: 600px;
        position: relative;
        width: 100%;
        padding-right: 15px;
        padding-left: 15px;
        margin-right: auto;
        margin-left: auto;
    }
}

.avatar img {
    width: 200px;
    height: 200px;
    object-fit: cover;
    border-radius: 50%;
    text-align: center;
}

.content {
    margin-bottom: 1rem;
}

.content-sec {
    font-size: 36px;
    color: #26272b;
    margin-bottom: 10px;
}

.content-sec-line {
    height: 2px;
    background-color: #3E4250;
    margin-top: 0;
    margin-bottom: 20px;
    border: none;
}

.works-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 20px;
    margin-top: 20px;
}

.work-card {
    background: #fff;
    border-radius: 10px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    transition: transform .3s;
}

.work-card:hover {
    transform: scale(1.05);
}

.work-image {
    width: 100%;
    height: 200px;
    object-fit: cover;
}

.work-details {
    padding: 15px;
}

.work-title {
    margin: 0;
    font-size: 20px;
    color: #333;
}

.work-desc {
    font-size: 16px;
    color: #666;
    margin: 10px 0;
}

.work-prizes {
    display: flex;
    align-items: center;
}

.award-icon {
    margin-right: 10px;
}

.prizes-list {
    margin: 0;
    padding: 0;
    list-style: none;
}

.profile {
    background-color: #26272b;
    border-radius: 20px;
    color: #f1faee;
    margin-bottom: 20px;
    padding: 20px;
}

.profile summary {
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    color: #f1faee;
    font-size: 36px;
    padding: 0.4em 0.4em;
    cursor: pointer;
    user-select: none;
    outline: none;
}

.profile summary::after {
    position: absolute;
    right: 1em;
    transform: translateY(-50%) rotate(45deg);
    width: 2rem;
    height: 2rem;
    border-bottom: 5px solid #457b9d;
    border-right: 5px solid #457b9d;
    content: '';
    transition: transform .3s;
}

.profile[open] summary::after {
    transform: rotate(225deg);
}

.profile summary:hover::after {
    border-bottom: 5px solid #f1faee;
    border-right: 5px solid #f1faee;
}

.profile p {
    transform: translateY(-10px);
    opacity: 0;
    margin: 0;
    padding: 0 2em 1.5em;
    color: #333333;
    transition: transform .5s, opacity .5s;
}

.profile[open] p {
    transform: none;
    opacity: 1;
}

.profile-sec {
    font-weight: 700;
    font-size: 3.2rem;
    color: #fff;
    line-height: 2rem;
    text-align: center;
    margin-bottom: 1.5rem;
}

.profile-sec-line {
    width: 3.5rem;
    height: 1px;
    background-color: #f1faee;
    margin-top: 0;
    margin-bottom: 20px;
    margin-left: auto;
    margin-right: auto;
    border: none;
}

.profile p {
    text-align: center;
    color: #fff;
}

.prize-table {
    width: 100%;
    margin: 0 auto;
    margin-bottom: 2em;
}

.prize-table th {
    padding: 10px;
    background-color: #3E4250;
    color: #f1faee;
    text-align: left;
}

.prize-table td {
    padding: 10px;
    background-color: #1d1e22;
    color: #f1faee;
}

.prize-table tr:last-child td {
    border-bottom: none;
}

hr {
    display: block;
    height: 1px;
    border: 0;
    border-top: 1px solid #ccc;
    margin: 1em 0;
    padding: 0;
}

h1 {
    font-size: 48px;
    color: #26272b;
    text-align: center;
    margin-bottom: 40px;
}

h2 {
    font-size: 36px;
    color: #26272b;
    margin-bottom: 10px;
}

p {
    font-size: 18px;
    color: #26272b;
}

@media (max-width: 768px) {
    .main {
        width: 100%;
        padding-top: 50px;
    }

    .profile-card {
        margin-bottom: 20px;
    }

    .box {
        flex-direction: column;
        align-items: center;
    }

    .info {
        margin-left: 0;
        text-align: center;
    }

    .name {
        font-size: 40px;
        margin-bottom: 5%;
    }

    .abst {
        font-size: 16px;
        margin-bottom: 5%;
    }

    .desc {
        font-size: 14px;
    }

    .avatar img {
        width: 150px;
        height: 150px;
    }

    .content-sec {
        font-size: 28px;
    }

    .prize-table th,
    .prize-table td {
        padding: 0.5rem;
    }
}
</style>
