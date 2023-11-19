<script setup lang="ts">
    import { config } from '../settings/site-settings';
    import Image1 from '../assets/img/back.png';
    import escape from '../assets/img/works/escape.jpg';
    import scorpion_2018_1 from '../assets/img/works/scorpion-2018-1.jpg';
    import scorpion_2018_2 from '../assets/img/works/scorpion-2018-2.jpg';
    import scorpion_2019_1 from '../assets/img/works/scorpion-2019-1.jpg';
    import scorpion_2019_2 from '../assets/img/works/scorpion-2019-2.jpg';
    import scorpion_2019_3 from '../assets/img/works/scorpion-2019-3.jpg';
    import scorpion_2020_1 from '../assets/img/works/scorpion-2020-1.jpg';
    import scorpion_2020_2 from '../assets/img/works/scorpion-2020-2.jpg';
    import scorpion_2021_1 from '../assets/img/works/scorpion-2021-1.jpg';
    import scorpion_2021_2 from '../assets/img/works/scorpion-2021-2.jpg';
    import scorpion_2021_3 from '../assets/img/works/scorpion-2021-3.jpg';
    import scorpion_2022_1 from '../assets/img/works/scorpion-2022-1.jpg';
    import scorpion_2022_2 from '../assets/img/works/scorpion-2022-2.jpg';
    import scorpion_2023_1 from '../assets/img/works/scorpion-2023-1.jpg';
    import scorpion_2023_2 from '../assets/img/works/scorpion-2023-2.jpg';
    import emorobo from '../assets/img/works/emorobo.jpg';
    import coursebreaker_2018 from '../assets/img/works/coursebreaker-2018.jpg';
    import coursebreaker_2019 from '../assets/img/works/coursebreaker-2019.jpg';

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
            image: scorpion_2023_2,
            title: "Scorpion ver.2023-2",
            desc: "RobocupJuniorJapnOpen2023に出場した機体です．",
            prizes: ["RSJ賞", "デザイン賞"]
        },
        {
            image: scorpion_2023_1,
            title: "Scorpion Ver.2023-1",
            desc: "RobocupJunior関東ブロック2023に出場した機体です",
            prizes: ["優勝"]
        },
        {
            image: scorpion_2022_2,
            title: "Scorpion Ver.2022-2",
            desc: "RobocupJuniorJapnOpen2022に出場した機体です．モーターや回路の大幅な改善を行いました．個人的には失敗作です．",
            prizes: ["5位"]
        },
        {
            image: scorpion_2022_1,
            title: "Scorpion Ver.2022-1",
            desc: "RobocupJunior京滋奈ブロック2022に出場した機体です．RCAPの機体をブラッシュアップし，ソフトウェアの改善を行いました．",
            prizes: ["優勝"]
        },
        {
            image: emorobo,
            title: "emorobo",
            desc: "「感情を読み取る配膳ロボット」というコンセプトです．THK賞の資金を基に製作しました",
            prizes: ["サイエンスキャッスル研究費 THK賞"]
        },
        {
            image: Image1,
            title: "Scorpion ver.2021-3",
            desc: "RCAPに出場した機体です．「サッカーをすること」を目指し大幅な改善を行いました．",
            prizes: ["2nd", "試合結果1位"]
        },
        {
            image: scorpion_2021_3,
            title: "Scorpion Ver.2021-3",
            desc: "世界大会で使用した機体です．ゴルフボールに対応したロボットを作るという課題に対応するため急遽作成しました．1日でゴルフボール対応のドリブラーを製作しました．",
            prizes: ["加点"]
        },
        {
            image: scorpion_2021_2,
            title: "Scorpion Ver.2021-2",
            desc: "世界大会で使用した機体です．多くの思い出が詰まった機体です．",
            prizes: ["4nd", "SestTDP"]
        },
        {
            image: scorpion_2021_1,
            title: "Scorpion Ver.2021-1",
            desc: "RobocupJuniorJapnOpen2021に出場した機体です",
            prizes: ["準優勝"]
        },
        {
            image: scorpion_2020_2,
            title: "Scorpion Ver.2020-2",
            desc: "試作機体です．",
            prizes: []
        },
        {
            image: coursebreaker_2019,
            title: "CourseBreaker Ver.2020",
            desc: "RobocupJunior京滋奈ブロック2020に出場した機体です．ゴールキーパー用途として製作しました．",
            prizes: ["優勝", "学生科学賞3等"]
        },
        {
            image: scorpion_2020_1,
            title: "Scorpion Ver.2020-1",
            desc: "RobocupJunior京滋奈ブロック2020に出場した機体です．アタッカー機体です．",
            prizes: ["優勝"]
        },
        {
            image: scorpion_2019_3,
            title: "Scorpion Ver.2019-3",
            desc: "関西オープン2019に出場した機体です．Open初参戦の機体です．",
            prizes: ["4位"]
        },
        {
            image: scorpion_2019_2,
            title: "Scorpion Ver.2019-2",
            desc: "試作機体です．せとうちオープンに持っていきました．",
            prizes: []
        },
        {
            image: scorpion_2019_1,
            title: "Scorpion Ver.2019-1",
            desc: "ビギナーの機体をLightweight対応に改造したものです．BIWAKOオープンやせとうちオープンで活躍しました．",
            prizes: ["4位", "SuperTeam優勝"]
        },
        {
            image: scorpion_2018_2,
            title: "Scorpion Ver.2018-2",
            desc: "RobocupJuniorJapnOpen2018に出場した機体です．ビギナーリーグに出場していました．",
            prizes: ["12位"]
        },
        {
            image: coursebreaker_2018,
            title: "CourseBreaker Ver.2018",
            desc: "RobocupJuniorJapnOpen&京滋奈ブロック2018に出場した機体です．",
            prizes: ["12位", "優勝"]
        },
        {
            image: scorpion_2018_1,
            title: "Scorpion Ver.2018-1",
            desc: "RobocupJunior京滋奈ブロック2018に出場した機体です．",
            prizes: ["優勝"]
        },
        {
            image: escape,
            title: "Escape",
            desc: "SRC13&国際ロボット展に出場していた時の機体です．",
            prizes: ["SRC13敢闘賞", "SRC国際ロボット展優勝"]
        },
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
                        <div class="social-icons">
                            <a :href="config.social.github" class="social-icon" target="_blank">
                                <font-awesome-icon :icon="['fab', 'github']" class="icon"
                                    :style="{ fontSize: '2em' }" />
                            </a>
                            <a :href="config.social.twitterProf" class="social-icon" target="_blank">
                                <font-awesome-icon :icon="['fab', 'twitter']" class="icon"
                                    :style="{ fontSize: '2em' }" />
                            </a>
                            <a :href="config.social.youtube" class="social-icon" target="_blank">
                                <font-awesome-icon :icon="['fab', 'youtube']" class="icon"
                                    :style="{ fontSize: '2em' }" />
                            </a>
                            <a :href="config.social.facebook" class="social-icon" target="_blank">
                                <font-awesome-icon :icon="['fab', 'facebook']" class="icon"
                                    :style="{ fontSize: '2em' }" />
                            </a>
                            <a :href="config.social.instagram" class="social-icon" target="_blank">
                                <font-awesome-icon :icon="['fab', 'instagram']" class="icon"
                                    :style="{ fontSize: '2em' }" />
                            </a>
                            <a :href="config.social.threads" class="social-icon" target="_blank">
                                <font-awesome-icon :icon="['fas', 't']" class="icon" :style="{ fontSize: '2em' }" />
                            </a>
                            <a :href="config.social.linkedin" class="social-icon" target="_blank">
                                <font-awesome-icon :icon="['fab', 'linkedin']" class="icon"
                                    :style="{ fontSize: '2em' }" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="content">
            <h2 class="content-sec">About this page</h2>
            <hr class="content-sec-line" noshade="" />
            <p>このブログ(akitoshi-lab.com)は，@konoe_aktoshiが日常で感じたことやひらめいたことを書いている”メモ帳”です．</p>
            <p>もちろん，技術的なことも書きますが，必ずしも正しいとは限りません．私が小さい脳で一生懸命考えてやったことの備忘録です．</p>
            <a :href="config.social.buyMeACoffee" target="_blank" rel="noopener noreferrer">
                <img height="40" alt="Buy Me A Coffee" src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png"
                    class="img-buymeacoffee">
            </a>
        </div>
        <div class="content">
            <h2 class="content-sec">サイト環境</h2>
            <hr class="content-sec-line" noshade="" />
            <h3>物理環境</h3>
            <p>Yamaha RTX1210</p>
            <p>HP ProLiant MicroServer Gen8</p>
            <h3>計算環境</h3>
            <p>Ubuntu Server 22.04.2 LTS</p>
            <p>Nginx</p>
            <p>Nuxt3</p>
            <p>Micro CMS</p>
        </div>
        <div class="content">
            <h2 class="content-sec">Works</h2>
            <hr class="content-sec-line" noshade="" />
            <div class="works-grid">
                <div class="work-card" v-for="(work, index) in works" :key="index">
                    <img :src="work.image" alt="work image" class="work-image" />
                    <div class="work-details">
                        <div class="work-details-info">
                            <h3 class="work-title">{{ work.title }}</h3>
                            <p class="work-desc">{{ work.desc }}</p>
                        </div>
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
        align-items: center;
        flex-direction: column;
        /* 中央に配置するために追加 */
        text-align: center;
        /* 中央に配置するために追加 */
    }

    .info {
        margin-top: 1rem;
        /* 上部のマージンを追加 */
        margin-bottom: 1rem;
        /* 下部のマージンを追加 */
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

    .social-icons {
        margin-top: 1rem;
        margin-bottom: 1rem;
        display: flex;
        /* アイコンを横並びにするために追加 */
        justify-content: center;
        /* アイコンを中央に配置するために追加 */
        flex-wrap: wrap;
        /* アイコンが折り返されるようにするために追加 */
    }

    .social-icon {
        display: flex;
        /* アイコンを中央に配置するために追加 */
        align-items: center;
        /* アイコンを中央に配置するために追加 */
        justify-content: center;
        /* アイコンを中央に配置するために追加 */
        width: 40px;
        height: 40px;
        background-color: #fff;
        border-radius: 10px;
        margin: 5px;
        /* アイコン間のマージンを追加 */
        transition: background-color 0.3s ease;
        color: #4481bd;
    }

    .social-icon:hover {
        background-color: #ccc;
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
        margin-top: 2.5rem;
        margin-bottom: 1rem;
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
        display: flex;
        flex-direction: column;
    }

    .work-card:hover {
        transform: scale(1.05);
    }

    .work-image {
        width: 100%;
        height: 160px;
        /* 気持ち悪いけど仕方ない */
        object-fit: cover;
    }

    .work-details {
        padding: 15px;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

    .work-details-info {
        display: flex;
        flex-direction: column;
        flex-grow: 1;
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
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
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
        /* color: #f1faee; */
        margin-bottom: 20px;
        padding: 20px;
    }

    .profile-sec {
        font-weight: 700;
        font-size: 3.2rem;
        /* color: #fff; */
        line-height: 2rem;
        text-align: center;
        margin-bottom: 1.5rem;
    }

    .profile-sec-line {
        width: 3.5rem;
        height: 1px;
        /* background-color: #f1faee; */
        margin-top: 0;
        margin-bottom: 20px;
        margin-left: auto;
        margin-right: auto;
        border: none;
    }

    .profile p {
        text-align: center;
        /* color: #fff; */
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