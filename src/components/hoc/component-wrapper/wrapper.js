import React, {Component} from 'react';

import FooterLinks from '../../footer/footer';
import Navigation from '../../navigation/navigation';

class wrapper extends Component {

    render() {
        return (
            <React.Fragment>
                <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Noto+Serif+KR" />
                <header>
                    <Navigation />
                </header>
                <main>
                    <header className="navigation--secondary">
                    </header>
                    <article className="content content--default">
                        <div className={`content-wrapper`}>
                            {this.props.children}
                        </div>
                    </article>
                </main>
                <footer>
                    <FooterLinks />
                </footer>
            </React.Fragment>
        );
    }
}

export default wrapper;