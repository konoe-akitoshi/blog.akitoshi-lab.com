<script setup lang="ts">
import { config } from '../settings/site-settings';

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
]
</script>

<template>
    <main class="main">
        <div class="profile-card">
            <div class="card-after">
                <div class="box">
                    <div class="avatar">
                        <img src="../assets/img/avatar.png" alt="Avatar">
                    </div>
                    <div class="info">
                        <h1 class="name">Aktioshi Saeki</h1>
                        <h2 class="abst">Engneer,Student</h2>
                        <p class="desc">ロボットを作るのが大好きな大学生です．</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="content">
            <h2 class="content-sec">
                Affiliation
            </h2>
            <hr class="content-sec-line" noshade="">
            <h3>
                電気通信大学
                MMA
                Scramble
            </h3>
        </div>
        <div class="content">
            <h2 class="content-sec">
                Prize🏆
            </h2>
            <hr class="content-sec-line" noshade="">

            <table class="prize-table">
                <tbody>
                    <tr v-for="item in skillSet" :key="item.name">
                        <td>{{ item.since }}</td>
                        <td>{{ item.by }}</td>
                        <td>{{ item.name }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </main>
</template>
  

<style scoped>
.main {
    position: relative;
    width: 720px;
    margin: 0 auto 0;
    padding-top: 112px;
    padding-bottom: 50px;
}

.profile-card {
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
    ;
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
    font-size: 10px;
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

img {
    width: 200px;
    height: 200px;
    object-fit: cover;
    border-radius: 50%;
    text-align: center;
}

.content {}


.content-sec {
    font-size: 36px;
    color: #26272b;
    margin-bottom: 10px;
}

.content-sec-line {
    color: #26272b;
    margin-top: 0px;
    margin-bottom: 20px;
}

.prize-table {
  width: 100%;
  border-collapse: collapse;
}

.prize-table td {
  padding: 0.5rem 1rem;
  border-bottom: 1px solid #ddd;
}

.prize-table tr:last-child td {
  border-bottom: none;
}

hr {
    display: block;
    height: 2px;
    padding: 0;
    margin: 30px 0;
    line-height: 0;
    border: 0;
    background-color: #3E4250;
}
</style>