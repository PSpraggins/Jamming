import React from 'react';

export class Track extends React.Component {
    constructor(props){
        super(props);
        
        this.renderAction = this.renderAction.bind(this);
    }
    
    renderAction () {
        if(isRemoval === true){
            return `<button className="Track-action">-</button>`;
        } else {
            return `<button className="Track-action">+</button>`;
        }
    }
    render() {
        return (<div className="Track">
            <div className="Track-information">
                <h3>
                    {/* <!-- track name will go here --> */}
                </h3>
                <p>
                    {/* <!-- track artist will go here-->
                    |
                    <!-- track album will go here --> */}
                </p>
            </div>
            this.renderAction();
        </div>
        );
    }
}
