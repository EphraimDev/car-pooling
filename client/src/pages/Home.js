import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';

const Home = () => {
  return (
    <div>
      <div className='image-box' style={{ height: '500px' }}>
        <div className='image-box__background'></div>
        <div className='image-box__overlay'></div>
        <div className='image-box__content'>
          <h1>Welcome to CarpoolNG</h1>
        </div>
        <div className='image-box__link'>
          <Link className='btn btn-primary' to='/register'>
            Register
          </Link>
        </div>
      </div>
      <div className='container'>
        <div className='text-center'>
          <h4>Popular Cars</h4>
        </div>
        {/* <div className='grid-container'>
          <div className='grid-item'>1</div>
          <div className='grid-item'>2</div>
          <div className='grid-item'>3</div>
        </div> */}
        <div className='row'>
          <Card
            style={{ width: '18rem' }}
            className='col-lg-4 col-md-6 col-sm-12 border-0'
          >
            <Card.Img variant='top' src='assets/images/car-1.jpg' />
            <Card.Body className="border">
              <Card.Title>Ikeja - Ikoyi</Card.Title>
              <div className='row'>
                <div className='col-sm-6 text-left'>
                  <span className='fa fa-star checked'></span>
                  <span className='fa fa-star checked'></span>
                  <span className='fa fa-star checked'></span>
                  <span className='fa fa-star checked'></span>
                  <span className='fa fa-star'></span>
                </div>
                <div className='col-sm-6 text-right'>
                  <Button variant='primary'>Join</Button>
                </div>
              </div>
            </Card.Body>
          </Card>
          <Card
            style={{ width: '18rem' }}
            className='col-lg-4 col-md-6 col-sm-12 border-0'
          >
            <Card.Img variant='top' src='assets/images/car-4.jpg' />
            <Card.Body className="border">
              <Card.Title>Berger - Ajah</Card.Title>
              <div className='row'>
                <div className='col-sm-6 text-left'>
                  <span className='fa fa-star checked'></span>
                  <span className='fa fa-star checked'></span>
                  <span className='fa fa-star checked'></span>
                  <span className='fa fa-star checked'></span>
                  <span className='fa fa-star'></span>
                </div>
                <div className='col-sm-6 text-right'>
                  <Button variant='primary'>Join</Button>
                </div>
              </div>
            </Card.Body>
          </Card>
          <Card
            style={{ width: '18rem' }}
            className='col-lg-4 col-md-6 col-sm-12 border-0'
          >
            <Card.Img variant='top' src='assets/images/car-3.jpg' />
            <Card.Body className="border">
              <Card.Title>Ajah - Oshodi</Card.Title>
              <div className='row'>
                <div className='col-sm-6 text-left'>
                  <span className='fa fa-star checked'></span>
                  <span className='fa fa-star checked'></span>
                  <span className='fa fa-star checked'></span>
                  <span className='fa fa-star checked'></span>
                  <span className='fa fa-star'></span>
                </div>
                <div className='col-sm-6 text-right'>
                  <Button variant='primary'>Join</Button>
                </div>
              </div>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Home;
