# ALAL

---

This is a Node library for easy integration of Alal For Business API for various applications from Alal.

## Getting started

### Requirements

This library requires NodeJS >= 12.0

### Installation

- `npm install alal-node`
- `yarn add alal-node`

### Usage

This SDK can be used both for Alal Sandbox and Production API.

### Setting ENV KEYS

For sucessfully running of the SDK; the `ALAL_API_KEY`.

Now this will throw a `AlalBadKeyError` if you do not set it as an environment variable, when initiatizing a function.

By default the SDK assumes that you are currently work on production, and your `ALAL_API_KEY` must be a production-grade secret key.

To run on sandbox(development mode), set `ALAL_PRODUCTION=false` as an environment variable.

## Contributing

Bug reports and pull requests are welcome on GitHub at [https://github.com/ALAL-Community/alal-node](https://github.com/ALAL-Community/alal-node). This project is intended to be a safe, welcoming space for collaboration, and contributors are expected to adhere to the code of conduct. Simply create a new branch and raise a Pull Request, we would review and merge.

## License

The library is available as open source under the terms of the [MIT License](https://opensource.org/licenses/MIT)
