suggest_topic_q = `{
    "model": "gpt-4o-mini",
    "tools": [
        {
            "type": "web_search"
        }
    ],
"input": [
    {
        "role": "user",
        "content": [
            {
                "type": "input_text",
                "text": "You are a senior social strategist; generate exactly four Facebook-suitable topic titles for the private piano teaching industry in British English for Australia - two Evergreen FAQs and two Trending items; when web search is available, ground the Trending items in Australian interest from the last 90 days and ignore sources older than 120 days; never include years or dates in any title; each title must be 8-12 words, specific, non-overlapping, audience-centred, no hashtags, no em dashes - use single hyphen, and end each title with [Evergreen] or [Trending]; output only a numbered list of the four titles. Keep topics specific, not generic. Anchor them in audience concerns, myths, or hot issues. Do not generate the full article, only the 4 topic titles. Always adapt phrasing to be suitable for Facebook posts that spark curiosity and interest. Output - A simple numbered list with 4 topic titles. - Each title should end with its label in brackets: [Evergreen] or [Trending]."
            }
        ]
    }
]`;

suggest_topic_a = `{
    "id": "resp_68b4fb5d29ec81a3bd7145553d0fe17b0685257985494fa1",
    "object": "response",
    "created_at": 1756691293,
    "status": "completed",
    "background": false,
    "error": null,
    "incomplete_details": null,
    "instructions": null,
    "max_output_tokens": null,
    "max_tool_calls": null,
    "model": "gpt-4o-mini-2024-07-18",
    "output": [
        {
            "id": "ws_68b4fb5e45fc81a38992d4ed6ec9b80c0685257985494fa1",
            "type": "web_search_call",
            "status": "completed",
            "action": {
                "type": "search",
                "query": "trending issues in private piano teaching Australia last 90 days"
            }
        },
        {
            "id": "msg_68b4fb5ff9c881a3bc9f824152f9c48c0685257985494fa1",
            "type": "message",
            "status": "completed",
            "content": [
                {
                    "type": "output_text",
                    "annotations": [],
                    "logprobs": [],
                    "text": "1. How to Make Piano Lessons Affordable Amid Rising Costs [Evergreen]\n2. Effective Strategies for Teaching Neurodiverse Piano Students [Evergreen]\n3. Adapting Piano Teaching to the Post-Pandemic Digital Landscape [Trending]\n4. Leveraging AI and VR to Enhance Piano Education [Trending] "
                }
            ],
            "role": "assistant"
        }
    ],
    "parallel_tool_calls": true,
    "previous_response_id": null,
    "prompt_cache_key": null,
    "reasoning": {
        "effort": null,
        "summary": null
    },
    "safety_identifier": null,
    "service_tier": "default",
    "store": true,
    "temperature": 1,
    "text": {
        "format": {
            "type": "text"
        },
        "verbosity": "medium"
    },
    "tool_choice": "auto",
    "tools": [
        {
            "type": "web_search",
            "filters": null,
            "search_context_size": "medium",
            "user_location": {
                "type": "approximate",
                "city": null,
                "country": "US",
                "region": null,
                "timezone": null
            }
        }
    ],
    "top_logprobs": 0,
    "top_p": 1,
    "truncation": "disabled",
    "usage": {
        "input_tokens": 8683,
        "input_tokens_details": {
            "cached_tokens": 0
        },
        "output_tokens": 86,
        "output_tokens_details": {
            "reasoning_tokens": 0
        },
        "total_tokens": 8769
    },
    "user": null,
    "metadata": {}
}`;

write_post_q = `{
    "model": "{{4O_MINI}}",
    "tools": [
        {
            "type": "web_search"
        }
    ],
    "input": [
        {
            "role": "user",
            "content": [
                {
                    "type": "input_text",
                    "text": "Write a Facebook post of less than 150 words about 'Effective Strategies for Teaching Neurodiverse Piano Students'; use the web_search tool to verify the most up-to-date techniques and products, but never include any URLs (http, https, www, .com, .org, etc.) or citations of any kind - if a source contains them, omit them entirely; Use the writing style guide below to shape the overall tone, rhythm, and expression. The sample_paragraph in the guide is only a tonal reference for feel and flow, not for content – do not copy or adapt its ideas. Ensure the article reads as natural and human-like, avoiding mechanical or formulaic phrasing. Output only the article text, with no notes or metadata. Writing style guide: The author's tone is conversational and enthusiastic, characterized by an informal and personal voice. Sentence structure varies between short and medium lengths, contributing to a relaxed feel, and the vocabulary is accessible and straightforward. Punctuation habits include the use of exclamation points to express excitement, while the overall style employs relatable and encouraging language to engage readers. \n\nvoice:first-person; tone_adjectives:conversational, enthusiastic; sentence_length:varied; punctuation_habits:casual with exclamation points; vocabulary_level:basic; rhetorical_devices:anecdote; formatting_habits:none; dos:use clear explanations, be relatable; donts:use jargon, sound overly formal; sample_paragraph:When the sun sets, the sky transforms into a canvas of colors. Birds return to their nests, filling the air with soft chirps. It is a peaceful time to reflect on the day and plan for tomorrow."
                }
            ]
        }
    ]
}`

write_post_a = `{
    "id": "resp_68b543d9e15c819f9d25dc4674cb19890a258589d3c413c7",
    "object": "response",
    "created_at": 1756709849,
    "status": "completed",
    "background": false,
    "error": null,
    "incomplete_details": null,
    "instructions": null,
    "max_output_tokens": null,
    "max_tool_calls": null,
    "model": "gpt-4o-mini-2024-07-18",
    "output": [
        {
            "id": "ws_68b543da780c819fa2b67b2caa2a9b7a0a258589d3c413c7",
            "type": "web_search_call",
            "status": "completed",
            "action": {
                "type": "search",
                "query": "effective strategies for teaching neurodiverse piano students"
            }
        },
        {
            "id": "msg_68b543dc9924819fb4ecd1ee837991c50a258589d3c413c7",
            "type": "message",
            "status": "completed",
            "content": [
                {
                    "type": "output_text",
                    "annotations": [],
                    "logprobs": [],
                    "text": "Teaching neurodiverse piano students is a rewarding journey that requires patience, creativity, and flexibility. One effective strategy is to establish a consistent lesson structure, providing clear expectations and routines that help students feel secure and focused. Incorporating visual aids, like diagrams or color-coded notes, can make learning more accessible and engaging. Breaking down complex pieces into smaller, manageable sections allows students to build confidence and mastery step by step. Integrating movement and rhythm games can also enhance focus and make practice sessions more enjoyable. Remember, every student is unique, so staying attuned to their individual needs and adapting your approach accordingly can make all the difference! Let's celebrate the diversity in our classrooms and create an environment where all students can thrive! "
                }
            ],
            "role": "assistant"
        }
    ],
    "parallel_tool_calls": true,
    "previous_response_id": null,
    "prompt_cache_key": null,
    "reasoning": {
        "effort": null,
        "summary": null
    },
    "safety_identifier": null,
    "service_tier": "default",
    "store": true,
    "temperature": 1.0,
    "text": {
        "format": {
            "type": "text"
        },
        "verbosity": "medium"
    },
    "tool_choice": "auto",
    "tools": [
        {
            "type": "web_search",
            "filters": null,
            "search_context_size": "medium",
            "user_location": {
                "type": "approximate",
                "city": null,
                "country": "US",
                "region": null,
                "timezone": null
            }
        }
    ],
    "top_logprobs": 0,
    "top_p": 1.0,
    "truncation": "disabled",
    "usage": {
        "input_tokens": 8813,
        "input_tokens_details": {
            "cached_tokens": 0
        },
        "output_tokens": 164,
        "output_tokens_details": {
            "reasoning_tokens": 0
        },
        "total_tokens": 8977
    },
    "user": null,
    "metadata": {}
}`