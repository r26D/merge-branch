FROM ruby:3.4.7-alpine

WORKDIR /action

# Install build dependencies for native extensions, then install gems, then remove build tools
RUN apk add --no-cache build-base

COPY Gemfile Gemfile.lock /action/
RUN bundle config set --local without 'development test' && \
    bundle install

# Remove build dependencies to reduce image size
RUN apk del build-base

COPY lib /action/lib

CMD ["ruby", "/action/lib/index.rb"]
