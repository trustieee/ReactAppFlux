import React from 'react';

class AboutPage extends React.Component {
  render() {
    return (
      // fragment lets us place container around adjacent elements
      //  but this wont render any additional html to the page
      //  such as if adding a <div> would
      // React.Fragment or empty <> + </>
      <>
        <h2>About</h2>
        <p>This app uses React.</p>
      </>
    );
  }
}

export default AboutPage;
