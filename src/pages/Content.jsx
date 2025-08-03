import './Content.css';

const Content=()=> {
    const items=[ {
        title: 'FAQs',
            description: 'Manage frequently asked questions shown to users.',
            button: 'Edit FAQs'
    }

    ,
    {
    title: 'Terms & Conditions',
        description: 'Update platform policies, legal disclaimers, and terms.',
        button: 'Edit Terms'
}

,
{
title: 'SEO & Landing Pages',
    description: 'Optimize homepage, meta tags, and search keywords.',
    button: 'Edit SEO Content'
}

,
{
title: 'Testimonials & Banners',
    description: 'Update client testimonials and homepage banners.',
    button: 'Manage Content'
}

];

return (<div className="content-management" > <h2>Content Management</h2> <div className="content-grid" > {
        items.map((item, i)=> (<div key= {
                    i
                }

                className="content-card" > <h3> {
                    item.title
                }

                </h3> <p> {
                    item.description
                }

                </p> <button className="btn-primary" > {
                    item.button
                }

                </button> </div>))
    }

    </div> </div>);
}

;

export default Content;