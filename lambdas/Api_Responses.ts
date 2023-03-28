interface ResponseData {
  [key: string]: any;
}

interface LambdaResponse {
  headers: {
    [key: string]: string;
  };
  statusCode: number;
  body: string;
}

const Responses = {
  _200(data: ResponseData = {}): LambdaResponse {
    return {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Methods": "*",
        "Access-Control-Allow-Origin": "*"
      },
      statusCode: 200,
      body: JSON.stringify(data)
    };
  },
  _400(data: ResponseData = {}): LambdaResponse {
    return {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Methods": "*",
        "Access-Control-Allow-Origin": "*"
      },
      statusCode: 400,
      body: JSON.stringify(data)
    };
  },
  _404(data: ResponseData = {}): LambdaResponse {
    return {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Methods": "*",
        "Access-Control-Allow-Origin": "*"
      },
      statusCode: 404,
      body: JSON.stringify(data)
    };
  },
  _500(data: ResponseData = {}): LambdaResponse {
    return {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Methods": "*",
        "Access-Control-Allow-Origin": "*"
      },
      statusCode: 500,
      body: JSON.stringify(data)
    };
  }
};

export default Responses;
