// 2560.56

const VIDEO_TOPICS = [
    {
        title: 'Intro and Agenda',
        from: 0,
        to: 180,
    },
    {
        title: 'Team updates and new news',
        from: 181,
        to: 943,
    },
    {
        title: 'Goto Market discussions',
        from: 944,
        to: 1503,
    },
    {
        title: 'Short updates',
        from: 1504,
        to: 1708,
    },
    {
        title: 'Goto Market discussions',
        from: 1709,
        to: 2551,
    },
    {
        title: 'Outro',
        from: 2552,
        to: 2560,
    },
]

const POSTERS = {}

let next = 0;
let counter = 5;
new Array(21).fill(0).forEach(_ => {
    POSTERS[next.toString()] = {
        poster: `./assets/poster-${next}.jpg`
    }
    next += counter
})

export {
    VIDEO_TOPICS,
    POSTERS,
}