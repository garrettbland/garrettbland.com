export default {
    cms_manual_init: true,
    backend: {
        name: 'git-gateway',
        repo: 'garrettbland/garrettbland.com',
        branch: 'master',
    },
    media_folder: 'public/images',
    public_folder: 'images',
    collections: [
        {
            name: 'pages',
            label: 'Pages',
            files: [
                {
                    label: 'Home',
                    name: 'home',
                    file: 'content/pages/home.md',
                    fields: [
                        {
                            label: 'Hero Title',
                            name: 'hero_title',
                            widget: 'string',
                        },
                        {
                            label: 'Hero Description',
                            name: 'hero_description',
                            widget: 'markdown',
                        },
                        {
                            label: 'Hero Image',
                            name: 'hero_image',
                            widget: 'image',
                        },
                    ],
                },
            ],
        },
    ],
}
