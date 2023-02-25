import openai
openai.api_key = "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"

model_engine = "text-davinci-003"

user_prompt = input("What is your prompt: ")

prompt = user_prompt

completion = openai.Completion.create(
    engine = model_engine,
    prompt = prompt,
    max_tokens = 1024,
    n = 1,
    stop = None,
    temperature = 0.5,
)

response = completion.choices[0].text
print(response)