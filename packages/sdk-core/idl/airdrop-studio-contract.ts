/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/airdrop_studio_contract.json`.
 */
export type AirdropStudioContract = {
  "address": "bonkAZceSmwJCcBXknvMjqdUSVJUjnj211w68d2VCei",
  "metadata": {
    "name": "airdropStudioContract",
    "version": "0.1.0",
    "spec": "0.1.0",
    "description": "Airdrop studio for bonkit.dev"
  },
  "instructions": [
    {
      "name": "appendOnchainRecipients",
      "discriminator": [
        88,
        187,
        192,
        252,
        105,
        199,
        193,
        33
      ],
      "accounts": [
        {
          "name": "creator",
          "writable": true,
          "signer": true
        },
        {
          "name": "studioConfig",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  97,
                  105,
                  114,
                  100,
                  114,
                  111,
                  112,
                  45,
                  115,
                  116,
                  117,
                  100,
                  105,
                  111,
                  45,
                  99,
                  111,
                  110,
                  102,
                  105,
                  103
                ]
              }
            ]
          }
        },
        {
          "name": "protocolConfig"
        },
        {
          "name": "airdrop",
          "writable": true
        },
        {
          "name": "listRoot",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  108,
                  105,
                  115,
                  116,
                  45,
                  114,
                  111,
                  111,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "airdrop"
              }
            ]
          }
        },
        {
          "name": "listChunk",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  108,
                  105,
                  115,
                  116,
                  45,
                  99,
                  104,
                  117,
                  110,
                  107
                ]
              },
              {
                "kind": "account",
                "path": "airdrop"
              }
            ]
          }
        },
        {
          "name": "protocolVault",
          "writable": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "eventAuthority",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  95,
                  95,
                  101,
                  118,
                  101,
                  110,
                  116,
                  95,
                  97,
                  117,
                  116,
                  104,
                  111,
                  114,
                  105,
                  116,
                  121
                ]
              }
            ]
          }
        },
        {
          "name": "program"
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": {
              "name": "appendOnchainRecipientsParams"
            }
          }
        }
      ]
    },
    {
      "name": "cancelMerkleAirdrop",
      "discriminator": [
        208,
        155,
        251,
        61,
        70,
        56,
        14,
        106
      ],
      "accounts": [
        {
          "name": "creator",
          "writable": true,
          "signer": true
        },
        {
          "name": "airdrop",
          "writable": true
        },
        {
          "name": "mint"
        },
        {
          "name": "vault",
          "writable": true
        },
        {
          "name": "creatorTokenAccount",
          "writable": true
        },
        {
          "name": "tokenProgram"
        },
        {
          "name": "memoProgram",
          "address": "MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr"
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "associatedTokenProgram",
          "address": "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
        },
        {
          "name": "eventAuthority",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  95,
                  95,
                  101,
                  118,
                  101,
                  110,
                  116,
                  95,
                  97,
                  117,
                  116,
                  104,
                  111,
                  114,
                  105,
                  116,
                  121
                ]
              }
            ]
          }
        },
        {
          "name": "program"
        }
      ],
      "args": []
    },
    {
      "name": "cancelOnchainAirdrop",
      "discriminator": [
        180,
        220,
        146,
        21,
        119,
        240,
        183,
        34
      ],
      "accounts": [
        {
          "name": "creator",
          "writable": true,
          "signer": true
        },
        {
          "name": "airdrop",
          "writable": true
        },
        {
          "name": "mint"
        },
        {
          "name": "vault",
          "writable": true
        },
        {
          "name": "creatorTokenAccount",
          "writable": true
        },
        {
          "name": "tokenProgram"
        },
        {
          "name": "memoProgram",
          "address": "MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr"
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "associatedTokenProgram",
          "address": "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
        },
        {
          "name": "eventAuthority",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  95,
                  95,
                  101,
                  118,
                  101,
                  110,
                  116,
                  95,
                  97,
                  117,
                  116,
                  104,
                  111,
                  114,
                  105,
                  116,
                  121
                ]
              }
            ]
          }
        },
        {
          "name": "program"
        }
      ],
      "args": []
    },
    {
      "name": "claimMerkleTokens",
      "discriminator": [
        84,
        58,
        147,
        32,
        78,
        173,
        23,
        246
      ],
      "accounts": [
        {
          "name": "airdrop",
          "docs": [
            "Airdrop round – must be `Approved`"
          ],
          "writable": true
        },
        {
          "name": "claimer",
          "docs": [
            "Claimant"
          ],
          "writable": true,
          "signer": true
        },
        {
          "name": "studioConfig",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  97,
                  105,
                  114,
                  100,
                  114,
                  111,
                  112,
                  45,
                  115,
                  116,
                  117,
                  100,
                  105,
                  111,
                  45,
                  99,
                  111,
                  110,
                  102,
                  105,
                  103
                ]
              }
            ]
          }
        },
        {
          "name": "protocolVault",
          "docs": [
            "Protocol vault receiving claim costs."
          ],
          "writable": true
        },
        {
          "name": "claimerAta",
          "docs": [
            "Claimant's ATA"
          ],
          "writable": true
        },
        {
          "name": "mint"
        },
        {
          "name": "vault",
          "docs": [
            "Vault holding undistributed tokens"
          ],
          "writable": true
        },
        {
          "name": "claimStatus",
          "docs": [
            "Claim status PDA: prevents double-claim per leaf hash"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  99,
                  108,
                  97,
                  105,
                  109,
                  45,
                  115,
                  116,
                  97,
                  116,
                  117,
                  115
                ]
              },
              {
                "kind": "account",
                "path": "airdrop"
              },
              {
                "kind": "arg",
                "path": "params.leaf"
              }
            ]
          }
        },
        {
          "name": "tokenProgram"
        },
        {
          "name": "memoProgram",
          "address": "MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr"
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "associatedTokenProgram",
          "address": "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": {
              "name": "claimMerkleParams"
            }
          }
        }
      ]
    },
    {
      "name": "claimOnchainTokens",
      "discriminator": [
        118,
        57,
        121,
        11,
        13,
        43,
        180,
        105
      ],
      "accounts": [
        {
          "name": "airdrop",
          "writable": true
        },
        {
          "name": "listRoot",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  108,
                  105,
                  115,
                  116,
                  45,
                  114,
                  111,
                  111,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "airdrop"
              }
            ]
          }
        },
        {
          "name": "listChunk",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  108,
                  105,
                  115,
                  116,
                  45,
                  99,
                  104,
                  117,
                  110,
                  107
                ]
              },
              {
                "kind": "account",
                "path": "airdrop"
              }
            ]
          }
        },
        {
          "name": "claimer",
          "writable": true,
          "signer": true
        },
        {
          "name": "studioConfig",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  97,
                  105,
                  114,
                  100,
                  114,
                  111,
                  112,
                  45,
                  115,
                  116,
                  117,
                  100,
                  105,
                  111,
                  45,
                  99,
                  111,
                  110,
                  102,
                  105,
                  103
                ]
              }
            ]
          }
        },
        {
          "name": "protocolVault",
          "docs": [
            "Protocol vault receiving claim costs."
          ],
          "writable": true
        },
        {
          "name": "claimerAta",
          "writable": true
        },
        {
          "name": "mint"
        },
        {
          "name": "vault",
          "writable": true
        },
        {
          "name": "claimStatus",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  99,
                  108,
                  97,
                  105,
                  109,
                  45,
                  115,
                  116,
                  97,
                  116,
                  117,
                  115
                ]
              },
              {
                "kind": "account",
                "path": "airdrop"
              },
              {
                "kind": "arg",
                "path": "params.entry_index"
              }
            ]
          }
        },
        {
          "name": "tokenProgram"
        },
        {
          "name": "memoProgram",
          "address": "MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr"
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "associatedTokenProgram",
          "address": "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
        },
        {
          "name": "eventAuthority",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  95,
                  95,
                  101,
                  118,
                  101,
                  110,
                  116,
                  95,
                  97,
                  117,
                  116,
                  104,
                  111,
                  114,
                  105,
                  116,
                  121
                ]
              }
            ]
          }
        },
        {
          "name": "program"
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": {
              "name": "claimOnchainParams"
            }
          }
        }
      ]
    },
    {
      "name": "createMerkleAirdrop",
      "discriminator": [
        90,
        140,
        123,
        107,
        48,
        144,
        3,
        37
      ],
      "accounts": [
        {
          "name": "studioConfig",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  97,
                  105,
                  114,
                  100,
                  114,
                  111,
                  112,
                  45,
                  115,
                  116,
                  117,
                  100,
                  105,
                  111,
                  45,
                  99,
                  111,
                  110,
                  102,
                  105,
                  103
                ]
              }
            ]
          }
        },
        {
          "name": "protocolConfig"
        },
        {
          "name": "creator",
          "writable": true,
          "signer": true
        },
        {
          "name": "draftRegistry",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  100,
                  114,
                  97,
                  102,
                  116,
                  45,
                  114,
                  101,
                  103
                ]
              },
              {
                "kind": "account",
                "path": "creator"
              }
            ]
          }
        },
        {
          "name": "airdrop",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  97,
                  105,
                  114,
                  100,
                  114,
                  111,
                  112
                ]
              },
              {
                "kind": "account",
                "path": "creator"
              },
              {
                "kind": "arg",
                "path": "params.draft_index"
              }
            ]
          }
        },
        {
          "name": "draftIndex",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  100,
                  114,
                  97,
                  102,
                  116,
                  45,
                  105,
                  100,
                  120
                ]
              },
              {
                "kind": "account",
                "path": "creator"
              },
              {
                "kind": "arg",
                "path": "params.draft_index"
              }
            ]
          }
        },
        {
          "name": "vault",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "airdrop"
              },
              {
                "kind": "account",
                "path": "tokenProgram"
              },
              {
                "kind": "account",
                "path": "mint"
              }
            ],
            "program": {
              "kind": "const",
              "value": [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89
              ]
            }
          }
        },
        {
          "name": "mint"
        },
        {
          "name": "protocolVault",
          "docs": [
            "Protocol vault receiving creation costs."
          ],
          "writable": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "tokenProgram"
        },
        {
          "name": "associatedTokenProgram",
          "address": "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
        },
        {
          "name": "eventAuthority",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  95,
                  95,
                  101,
                  118,
                  101,
                  110,
                  116,
                  95,
                  97,
                  117,
                  116,
                  104,
                  111,
                  114,
                  105,
                  116,
                  121
                ]
              }
            ]
          }
        },
        {
          "name": "program"
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": {
              "name": "createMerkleAirdropParams"
            }
          }
        }
      ]
    },
    {
      "name": "createOnchainAirdrop",
      "discriminator": [
        30,
        165,
        141,
        73,
        117,
        1,
        123,
        246
      ],
      "accounts": [
        {
          "name": "studioConfig",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  97,
                  105,
                  114,
                  100,
                  114,
                  111,
                  112,
                  45,
                  115,
                  116,
                  117,
                  100,
                  105,
                  111,
                  45,
                  99,
                  111,
                  110,
                  102,
                  105,
                  103
                ]
              }
            ]
          }
        },
        {
          "name": "protocolConfig"
        },
        {
          "name": "creator",
          "writable": true,
          "signer": true
        },
        {
          "name": "draftRegistry",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  100,
                  114,
                  97,
                  102,
                  116,
                  45,
                  114,
                  101,
                  103
                ]
              },
              {
                "kind": "account",
                "path": "creator"
              }
            ]
          }
        },
        {
          "name": "airdrop",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  97,
                  105,
                  114,
                  100,
                  114,
                  111,
                  112
                ]
              },
              {
                "kind": "account",
                "path": "creator"
              },
              {
                "kind": "arg",
                "path": "params.draft_index"
              }
            ]
          }
        },
        {
          "name": "draftIndex",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  100,
                  114,
                  97,
                  102,
                  116,
                  45,
                  105,
                  100,
                  120
                ]
              },
              {
                "kind": "account",
                "path": "creator"
              },
              {
                "kind": "arg",
                "path": "params.draft_index"
              }
            ]
          }
        },
        {
          "name": "listRoot",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  108,
                  105,
                  115,
                  116,
                  45,
                  114,
                  111,
                  111,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "airdrop"
              }
            ]
          }
        },
        {
          "name": "listChunk",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  108,
                  105,
                  115,
                  116,
                  45,
                  99,
                  104,
                  117,
                  110,
                  107
                ]
              },
              {
                "kind": "account",
                "path": "airdrop"
              }
            ]
          }
        },
        {
          "name": "vault",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "airdrop"
              },
              {
                "kind": "account",
                "path": "tokenProgram"
              },
              {
                "kind": "account",
                "path": "mint"
              }
            ],
            "program": {
              "kind": "const",
              "value": [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89
              ]
            }
          }
        },
        {
          "name": "mint"
        },
        {
          "name": "protocolVault",
          "docs": [
            "Protocol vault receiving creation costs."
          ],
          "writable": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "tokenProgram"
        },
        {
          "name": "associatedTokenProgram",
          "address": "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
        },
        {
          "name": "eventAuthority",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  95,
                  95,
                  101,
                  118,
                  101,
                  110,
                  116,
                  95,
                  97,
                  117,
                  116,
                  104,
                  111,
                  114,
                  105,
                  116,
                  121
                ]
              }
            ]
          }
        },
        {
          "name": "program"
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": {
              "name": "createOnchainAirdropParams"
            }
          }
        }
      ]
    },
    {
      "name": "depositMerkleAirdrop",
      "discriminator": [
        129,
        9,
        210,
        176,
        19,
        33,
        20,
        148
      ],
      "accounts": [
        {
          "name": "creator",
          "writable": true,
          "signer": true
        },
        {
          "name": "studioConfig",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  97,
                  105,
                  114,
                  100,
                  114,
                  111,
                  112,
                  45,
                  115,
                  116,
                  117,
                  100,
                  105,
                  111,
                  45,
                  99,
                  111,
                  110,
                  102,
                  105,
                  103
                ]
              }
            ]
          }
        },
        {
          "name": "protocolConfig"
        },
        {
          "name": "airdrop",
          "writable": true
        },
        {
          "name": "mint"
        },
        {
          "name": "vault",
          "writable": true
        },
        {
          "name": "payerTokenAccount",
          "writable": true
        },
        {
          "name": "tokenProgram"
        },
        {
          "name": "protocolVault",
          "docs": [
            "Protocol vault receiving deposit costs."
          ],
          "writable": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "eventAuthority",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  95,
                  95,
                  101,
                  118,
                  101,
                  110,
                  116,
                  95,
                  97,
                  117,
                  116,
                  104,
                  111,
                  114,
                  105,
                  116,
                  121
                ]
              }
            ]
          }
        },
        {
          "name": "program"
        }
      ],
      "args": []
    },
    {
      "name": "depositOnchainAirdrop",
      "discriminator": [
        194,
        58,
        250,
        92,
        1,
        225,
        91,
        243
      ],
      "accounts": [
        {
          "name": "creator",
          "writable": true,
          "signer": true
        },
        {
          "name": "studioConfig",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  97,
                  105,
                  114,
                  100,
                  114,
                  111,
                  112,
                  45,
                  115,
                  116,
                  117,
                  100,
                  105,
                  111,
                  45,
                  99,
                  111,
                  110,
                  102,
                  105,
                  103
                ]
              }
            ]
          }
        },
        {
          "name": "protocolConfig"
        },
        {
          "name": "airdrop",
          "writable": true
        },
        {
          "name": "listRoot",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  108,
                  105,
                  115,
                  116,
                  45,
                  114,
                  111,
                  111,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "airdrop"
              }
            ]
          }
        },
        {
          "name": "mint"
        },
        {
          "name": "vault",
          "writable": true
        },
        {
          "name": "payerTokenAccount",
          "writable": true
        },
        {
          "name": "tokenProgram"
        },
        {
          "name": "protocolVault",
          "docs": [
            "Protocol vault receiving deposit costs."
          ],
          "writable": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "eventAuthority",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  95,
                  95,
                  101,
                  118,
                  101,
                  110,
                  116,
                  95,
                  97,
                  117,
                  116,
                  104,
                  111,
                  114,
                  105,
                  116,
                  121
                ]
              }
            ]
          }
        },
        {
          "name": "program"
        }
      ],
      "args": []
    },
    {
      "name": "initializeProtocolConfig",
      "discriminator": [
        28,
        50,
        43,
        233,
        244,
        98,
        123,
        118
      ],
      "accounts": [
        {
          "name": "protocolConfig",
          "writable": true
        },
        {
          "name": "payer",
          "writable": true,
          "signer": true
        },
        {
          "name": "studioConfig",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  97,
                  105,
                  114,
                  100,
                  114,
                  111,
                  112,
                  45,
                  115,
                  116,
                  117,
                  100,
                  105,
                  111,
                  45,
                  99,
                  111,
                  110,
                  102,
                  105,
                  103
                ]
              }
            ]
          }
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "eventAuthority",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  95,
                  95,
                  101,
                  118,
                  101,
                  110,
                  116,
                  95,
                  97,
                  117,
                  116,
                  104,
                  111,
                  114,
                  105,
                  116,
                  121
                ]
              }
            ]
          }
        },
        {
          "name": "program"
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": {
              "name": "initProtocolConfigParams"
            }
          }
        }
      ]
    },
    {
      "name": "initializeStudioConfig",
      "discriminator": [
        167,
        156,
        148,
        195,
        148,
        75,
        152,
        212
      ],
      "accounts": [
        {
          "name": "configAccount",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  97,
                  105,
                  114,
                  100,
                  114,
                  111,
                  112,
                  45,
                  115,
                  116,
                  117,
                  100,
                  105,
                  111,
                  45,
                  99,
                  111,
                  110,
                  102,
                  105,
                  103
                ]
              }
            ]
          }
        },
        {
          "name": "airdropProgram",
          "address": "bonkAZceSmwJCcBXknvMjqdUSVJUjnj211w68d2VCei"
        },
        {
          "name": "programData"
        },
        {
          "name": "configAuthority",
          "writable": true,
          "signer": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "eventAuthority",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  95,
                  95,
                  101,
                  118,
                  101,
                  110,
                  116,
                  95,
                  97,
                  117,
                  116,
                  104,
                  111,
                  114,
                  105,
                  116,
                  121
                ]
              }
            ]
          }
        },
        {
          "name": "program"
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": {
              "name": "initStudioConfigParams"
            }
          }
        }
      ]
    },
    {
      "name": "registerMerkleRoot",
      "discriminator": [
        51,
        45,
        179,
        28,
        97,
        205,
        185,
        134
      ],
      "accounts": [
        {
          "name": "studioConfig",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  97,
                  105,
                  114,
                  100,
                  114,
                  111,
                  112,
                  45,
                  115,
                  116,
                  117,
                  100,
                  105,
                  111,
                  45,
                  99,
                  111,
                  110,
                  102,
                  105,
                  103
                ]
              }
            ]
          }
        },
        {
          "name": "protocolConfig"
        },
        {
          "name": "airdrop",
          "writable": true
        },
        {
          "name": "mint"
        },
        {
          "name": "creator",
          "writable": true,
          "signer": true
        },
        {
          "name": "protocolVault",
          "docs": [
            "Protocol vault receiving register costs."
          ],
          "writable": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "eventAuthority",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  95,
                  95,
                  101,
                  118,
                  101,
                  110,
                  116,
                  95,
                  97,
                  117,
                  116,
                  104,
                  111,
                  114,
                  105,
                  116,
                  121
                ]
              }
            ]
          }
        },
        {
          "name": "program"
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": {
              "name": "registerMerkleRootParams"
            }
          }
        }
      ]
    },
    {
      "name": "startMerkleAirdrop",
      "discriminator": [
        79,
        91,
        110,
        101,
        111,
        34,
        64,
        221
      ],
      "accounts": [
        {
          "name": "studioConfig",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  97,
                  105,
                  114,
                  100,
                  114,
                  111,
                  112,
                  45,
                  115,
                  116,
                  117,
                  100,
                  105,
                  111,
                  45,
                  99,
                  111,
                  110,
                  102,
                  105,
                  103
                ]
              }
            ]
          }
        },
        {
          "name": "protocolConfig"
        },
        {
          "name": "airdrop",
          "writable": true
        },
        {
          "name": "creator",
          "writable": true,
          "signer": true
        },
        {
          "name": "protocolVault",
          "docs": [
            "Protocol vault receiving start costs."
          ],
          "writable": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "eventAuthority",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  95,
                  95,
                  101,
                  118,
                  101,
                  110,
                  116,
                  95,
                  97,
                  117,
                  116,
                  104,
                  111,
                  114,
                  105,
                  116,
                  121
                ]
              }
            ]
          }
        },
        {
          "name": "program"
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": {
              "name": "startMerkleAirdropParams"
            }
          }
        }
      ]
    },
    {
      "name": "startOnchainAirdrop",
      "discriminator": [
        235,
        97,
        63,
        215,
        189,
        18,
        81,
        175
      ],
      "accounts": [
        {
          "name": "creator",
          "writable": true,
          "signer": true
        },
        {
          "name": "studioConfig",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  97,
                  105,
                  114,
                  100,
                  114,
                  111,
                  112,
                  45,
                  115,
                  116,
                  117,
                  100,
                  105,
                  111,
                  45,
                  99,
                  111,
                  110,
                  102,
                  105,
                  103
                ]
              }
            ]
          }
        },
        {
          "name": "protocolConfig"
        },
        {
          "name": "airdrop",
          "writable": true
        },
        {
          "name": "listRoot",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  108,
                  105,
                  115,
                  116,
                  45,
                  114,
                  111,
                  111,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "airdrop"
              }
            ]
          }
        },
        {
          "name": "protocolVault",
          "docs": [
            "Protocol vault receiving start costs."
          ],
          "writable": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "eventAuthority",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  95,
                  95,
                  101,
                  118,
                  101,
                  110,
                  116,
                  95,
                  97,
                  117,
                  116,
                  104,
                  111,
                  114,
                  105,
                  116,
                  121
                ]
              }
            ]
          }
        },
        {
          "name": "program"
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": {
              "name": "startOnchainAirdropParams"
            }
          }
        }
      ]
    },
    {
      "name": "updateProtocolConfig",
      "discriminator": [
        197,
        97,
        123,
        54,
        221,
        168,
        11,
        135
      ],
      "accounts": [
        {
          "name": "protocolConfig",
          "writable": true
        },
        {
          "name": "studioConfig",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  97,
                  105,
                  114,
                  100,
                  114,
                  111,
                  112,
                  45,
                  115,
                  116,
                  117,
                  100,
                  105,
                  111,
                  45,
                  99,
                  111,
                  110,
                  102,
                  105,
                  103
                ]
              }
            ]
          }
        },
        {
          "name": "configAuthority",
          "writable": true,
          "signer": true,
          "relations": [
            "studioConfig"
          ]
        },
        {
          "name": "eventAuthority",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  95,
                  95,
                  101,
                  118,
                  101,
                  110,
                  116,
                  95,
                  97,
                  117,
                  116,
                  104,
                  111,
                  114,
                  105,
                  116,
                  121
                ]
              }
            ]
          }
        },
        {
          "name": "program"
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": {
              "name": "updateProtocolConfigParams"
            }
          }
        }
      ]
    },
    {
      "name": "updateStudioConfig",
      "discriminator": [
        243,
        146,
        125,
        172,
        230,
        187,
        93,
        123
      ],
      "accounts": [
        {
          "name": "configAccount",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  97,
                  105,
                  114,
                  100,
                  114,
                  111,
                  112,
                  45,
                  115,
                  116,
                  117,
                  100,
                  105,
                  111,
                  45,
                  99,
                  111,
                  110,
                  102,
                  105,
                  103
                ]
              }
            ]
          }
        },
        {
          "name": "configAuthority",
          "writable": true,
          "signer": true,
          "relations": [
            "configAccount"
          ]
        },
        {
          "name": "eventAuthority",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  95,
                  95,
                  101,
                  118,
                  101,
                  110,
                  116,
                  95,
                  97,
                  117,
                  116,
                  104,
                  111,
                  114,
                  105,
                  116,
                  121
                ]
              }
            ]
          }
        },
        {
          "name": "program"
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": {
              "name": "updateStudioConfigParams"
            }
          }
        }
      ]
    },
    {
      "name": "withdrawMerkleAirdrop",
      "discriminator": [
        124,
        134,
        136,
        135,
        147,
        213,
        96,
        207
      ],
      "accounts": [
        {
          "name": "creator",
          "writable": true,
          "signer": true
        },
        {
          "name": "airdrop",
          "writable": true
        },
        {
          "name": "mint"
        },
        {
          "name": "vault",
          "writable": true
        },
        {
          "name": "creatorTokenAccount",
          "writable": true
        },
        {
          "name": "tokenProgram"
        },
        {
          "name": "memoProgram",
          "address": "MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr"
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "associatedTokenProgram",
          "address": "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
        },
        {
          "name": "eventAuthority",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  95,
                  95,
                  101,
                  118,
                  101,
                  110,
                  116,
                  95,
                  97,
                  117,
                  116,
                  104,
                  111,
                  114,
                  105,
                  116,
                  121
                ]
              }
            ]
          }
        },
        {
          "name": "program"
        }
      ],
      "args": []
    },
    {
      "name": "withdrawOnchainAirdrop",
      "discriminator": [
        152,
        147,
        37,
        215,
        194,
        239,
        180,
        102
      ],
      "accounts": [
        {
          "name": "creator",
          "writable": true,
          "signer": true
        },
        {
          "name": "airdrop",
          "writable": true
        },
        {
          "name": "mint"
        },
        {
          "name": "vault",
          "writable": true
        },
        {
          "name": "creatorTokenAccount",
          "writable": true
        },
        {
          "name": "tokenProgram"
        },
        {
          "name": "memoProgram",
          "address": "MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr"
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "associatedTokenProgram",
          "address": "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
        },
        {
          "name": "eventAuthority",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  95,
                  95,
                  101,
                  118,
                  101,
                  110,
                  116,
                  95,
                  97,
                  117,
                  116,
                  104,
                  111,
                  114,
                  105,
                  116,
                  121
                ]
              }
            ]
          }
        },
        {
          "name": "program"
        }
      ],
      "args": []
    }
  ],
  "accounts": [
    {
      "name": "airdropProtocolConfig",
      "discriminator": [
        182,
        140,
        212,
        121,
        236,
        112,
        171,
        99
      ]
    },
    {
      "name": "airdropStudioConfig",
      "discriminator": [
        245,
        76,
        54,
        47,
        97,
        125,
        53,
        141
      ]
    },
    {
      "name": "claimStatus",
      "discriminator": [
        22,
        183,
        249,
        157,
        247,
        95,
        150,
        96
      ]
    },
    {
      "name": "draftIndex",
      "discriminator": [
        210,
        178,
        236,
        43,
        98,
        133,
        119,
        229
      ]
    },
    {
      "name": "draftRegistry",
      "discriminator": [
        39,
        95,
        131,
        182,
        236,
        194,
        11,
        133
      ]
    },
    {
      "name": "listRoot",
      "discriminator": [
        245,
        62,
        57,
        68,
        97,
        235,
        172,
        240
      ]
    },
    {
      "name": "merkleProofAirdrop",
      "discriminator": [
        57,
        83,
        229,
        57,
        46,
        186,
        81,
        103
      ]
    },
    {
      "name": "onchainListAirdrop",
      "discriminator": [
        51,
        172,
        66,
        52,
        187,
        222,
        110,
        7
      ]
    }
  ],
  "events": [
    {
      "name": "airdropCanceledEvent",
      "discriminator": [
        208,
        168,
        213,
        213,
        143,
        189,
        124,
        74
      ]
    },
    {
      "name": "airdropDraftCreatedEvent",
      "discriminator": [
        48,
        179,
        191,
        138,
        132,
        224,
        243,
        244
      ]
    },
    {
      "name": "claimTokenEvent",
      "discriminator": [
        127,
        10,
        14,
        49,
        47,
        171,
        31,
        127
      ]
    },
    {
      "name": "createConfigEvent",
      "discriminator": [
        107,
        52,
        89,
        129,
        55,
        226,
        81,
        22
      ]
    },
    {
      "name": "createProtocolConfigEvent",
      "discriminator": [
        44,
        74,
        184,
        0,
        56,
        102,
        52,
        171
      ]
    },
    {
      "name": "merkleAirdropDepositedEvent",
      "discriminator": [
        102,
        107,
        60,
        163,
        118,
        171,
        57,
        172
      ]
    },
    {
      "name": "merkleAirdropStartedEvent",
      "discriminator": [
        251,
        240,
        64,
        108,
        102,
        41,
        135,
        217
      ]
    },
    {
      "name": "merkleAirdropWithdrawnEvent",
      "discriminator": [
        19,
        241,
        82,
        184,
        118,
        253,
        149,
        98
      ]
    },
    {
      "name": "merkleRootRegisteredEvent",
      "discriminator": [
        142,
        111,
        67,
        50,
        100,
        45,
        126,
        44
      ]
    },
    {
      "name": "onchainAirdropDepositedEvent",
      "discriminator": [
        54,
        224,
        243,
        194,
        29,
        104,
        84,
        57
      ]
    },
    {
      "name": "onchainAirdropStartedEvent",
      "discriminator": [
        219,
        167,
        202,
        123,
        151,
        146,
        78,
        18
      ]
    },
    {
      "name": "onchainAirdropWithdrawnEvent",
      "discriminator": [
        188,
        82,
        32,
        127,
        174,
        255,
        67,
        192
      ]
    },
    {
      "name": "onchainRecipientsAppendedEvent",
      "discriminator": [
        191,
        140,
        60,
        224,
        176,
        199,
        46,
        39
      ]
    },
    {
      "name": "updateConfigEvent",
      "discriminator": [
        96,
        112,
        253,
        102,
        59,
        78,
        75,
        134
      ]
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "accountNotFound",
      "msg": "Account not found"
    },
    {
      "code": 6001,
      "name": "invalidConfigAuthority",
      "msg": "Invalid config authority"
    },
    {
      "code": 6002,
      "name": "accountAlreadyInitialized",
      "msg": "Account already initialized"
    },
    {
      "code": 6003,
      "name": "invalidAirdropType",
      "msg": "Invalid airdrop type"
    },
    {
      "code": 6004,
      "name": "invalidActionType",
      "msg": "Invalid action type"
    },
    {
      "code": 6005,
      "name": "invalidPubkey",
      "msg": "Invalid pubkey"
    },
    {
      "code": 6006,
      "name": "invalidTimestamp",
      "msg": "Invalid timestamp"
    },
    {
      "code": 6007,
      "name": "invalidAmount",
      "msg": "Invalid Amount"
    },
    {
      "code": 6008,
      "name": "uriTooLong",
      "msg": "Uri Too Long"
    },
    {
      "code": 6009,
      "name": "invalidSourceAccount",
      "msg": "Invalid source account"
    },
    {
      "code": 6010,
      "name": "airdropNotStarted",
      "msg": "Airdrop not started"
    },
    {
      "code": 6011,
      "name": "airdropEnded",
      "msg": "Airdrop ended"
    },
    {
      "code": 6012,
      "name": "airdropNotEnded",
      "msg": "Airdrop not ended"
    },
    {
      "code": 6013,
      "name": "airdropHasNoEnd",
      "msg": "Airdrop has no end"
    },
    {
      "code": 6014,
      "name": "invalidState",
      "msg": "Invalid state"
    },
    {
      "code": 6015,
      "name": "endBeforeStart",
      "msg": "End before start"
    },
    {
      "code": 6016,
      "name": "startTimeInPast",
      "msg": "Start time in past"
    },
    {
      "code": 6017,
      "name": "alreadyClaimed",
      "msg": "Already claimed"
    },
    {
      "code": 6018,
      "name": "invalidMerkleProof",
      "msg": "Invalid merkle proof"
    },
    {
      "code": 6019,
      "name": "mathOverflow",
      "msg": "Math overflow"
    },
    {
      "code": 6020,
      "name": "insufficientVaultBalance",
      "msg": "Insufficient vault balance"
    },
    {
      "code": 6021,
      "name": "insufficientFunds",
      "msg": "Insufficient funds"
    },
    {
      "code": 6022,
      "name": "invalidCostLamports",
      "msg": "Creation cost exceeds the maximum allowed (1 SOL)."
    },
    {
      "code": 6023,
      "name": "unsupportedMint",
      "msg": "Unsupported mint"
    },
    {
      "code": 6024,
      "name": "mintFreezeAuthorityNotAllowed",
      "msg": "Mint freeze authority is not allowed"
    },
    {
      "code": 6025,
      "name": "sourceCpiGuardEnabled",
      "msg": "Source token account has CPI Guard enabled"
    },
    {
      "code": 6026,
      "name": "invalidAirdropAccount",
      "msg": "Invalid airdrop account"
    },
    {
      "code": 6027,
      "name": "missingDraftRound",
      "msg": "Missing draft round"
    },
    {
      "code": 6028,
      "name": "invalidCreator",
      "msg": "Invalid creator"
    },
    {
      "code": 6029,
      "name": "invalidDraftRound",
      "msg": "Invalid draft round"
    },
    {
      "code": 6030,
      "name": "invalidMint",
      "msg": "Invalid mint"
    },
    {
      "code": 6031,
      "name": "invalidTokenProgram",
      "msg": "Invalid token program"
    },
    {
      "code": 6032,
      "name": "invalidMemoProgram",
      "msg": "Invalid memo program"
    },
    {
      "code": 6033,
      "name": "overflow",
      "msg": "overflow"
    },
    {
      "code": 6034,
      "name": "invalidAirdropStatus",
      "msg": "Invalid airdrop status"
    },
    {
      "code": 6035,
      "name": "invalidProtocolVault",
      "msg": "Invalid protocol vault"
    },
    {
      "code": 6036,
      "name": "invalidAirdropDraftIndex",
      "msg": "Invalid airdrop draft index"
    },
    {
      "code": 6037,
      "name": "invalidPda",
      "msg": "Invalid PDA"
    },
    {
      "code": 6038,
      "name": "invalidLeafData",
      "msg": "Invalid leaf data"
    },
    {
      "code": 6039,
      "name": "emptyRecipientList",
      "msg": "Empty recipient list"
    },
    {
      "code": 6040,
      "name": "appendRecipientsLimitExceeded",
      "msg": "Append recipients limit exceeded"
    },
    {
      "code": 6041,
      "name": "listEmpty",
      "msg": "List is empty"
    },
    {
      "code": 6042,
      "name": "listChunkOverflow",
      "msg": "List chunk overflow"
    },
    {
      "code": 6043,
      "name": "transferFeeCalculationFailed",
      "msg": "Transfer fee calculation failed"
    },
    {
      "code": 6044,
      "name": "emptyMerkleRoots",
      "msg": "Merkle roots list is empty"
    },
    {
      "code": 6045,
      "name": "merkleRootsLimitExceeded",
      "msg": "Merkle roots list exceeds the maximum length"
    },
    {
      "code": 6046,
      "name": "invalidMerkleRoot",
      "msg": "Invalid merkle root"
    },
    {
      "code": 6047,
      "name": "invalidMerkleLeafCount",
      "msg": "Invalid merkle leaf count"
    },
    {
      "code": 6048,
      "name": "merkleLeafCountExceeded",
      "msg": "Merkle leaf count exceeds the maximum allowed per root"
    },
    {
      "code": 6049,
      "name": "invalidMerkleRootSum",
      "msg": "Invalid merkle root sum"
    },
    {
      "code": 6050,
      "name": "duplicateMerkleRoot",
      "msg": "Duplicate merkle root"
    },
    {
      "code": 6051,
      "name": "merkleRootsAlreadyRegistered",
      "msg": "Merkle roots already registered"
    },
    {
      "code": 6052,
      "name": "merkleRootSumTotalMismatch",
      "msg": "Merkle root sum total mismatch"
    },
    {
      "code": 6053,
      "name": "airdropDurationTooShort",
      "msg": "Airdrop duration is too short"
    }
  ],
  "types": [
    {
      "name": "airdropAction",
      "repr": {
        "kind": "rust"
      },
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "createOnchainAirdrop"
          },
          {
            "name": "createMerkleAirdrop"
          },
          {
            "name": "registerMerkleRoot"
          },
          {
            "name": "depositMerkleAirdrop"
          },
          {
            "name": "startMerkleAirdrop"
          },
          {
            "name": "appendOnchainRecipients"
          },
          {
            "name": "depositOnchainAirdrop"
          },
          {
            "name": "startOnchainAirdrop"
          }
        ]
      }
    },
    {
      "name": "airdropBase",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "isInitialized",
            "type": "bool"
          },
          {
            "name": "airdropIndex",
            "type": "u32"
          },
          {
            "name": "creator",
            "type": "pubkey"
          },
          {
            "name": "airdropType",
            "type": {
              "defined": {
                "name": "airdropType"
              }
            }
          },
          {
            "name": "mint",
            "type": "pubkey"
          },
          {
            "name": "vault",
            "type": "pubkey"
          },
          {
            "name": "totalAmount",
            "type": "u64"
          },
          {
            "name": "claimedAmount",
            "type": "u64"
          },
          {
            "name": "createdAt",
            "type": "u64"
          },
          {
            "name": "startsAt",
            "type": {
              "option": "u64"
            }
          },
          {
            "name": "endsAt",
            "type": {
              "option": "u64"
            }
          },
          {
            "name": "status",
            "type": {
              "defined": {
                "name": "airdropStatus"
              }
            }
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "airdropCanceledEvent",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "airdrop",
            "type": "pubkey"
          },
          {
            "name": "mint",
            "type": "pubkey"
          },
          {
            "name": "canceledBy",
            "type": "pubkey"
          },
          {
            "name": "createdAt",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "airdropDraftCreatedEvent",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "airdrop",
            "type": "pubkey"
          },
          {
            "name": "airdropType",
            "type": "string"
          },
          {
            "name": "creator",
            "type": "pubkey"
          },
          {
            "name": "mint",
            "type": "pubkey"
          },
          {
            "name": "vault",
            "type": "pubkey"
          },
          {
            "name": "createdAt",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "airdropProtocolConfig",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "isInitialized",
            "type": "bool"
          },
          {
            "name": "action",
            "type": {
              "defined": {
                "name": "airdropAction"
              }
            }
          },
          {
            "name": "costLamports",
            "type": "u64"
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "airdropStatus",
      "repr": {
        "kind": "rust"
      },
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "draft"
          },
          {
            "name": "approved"
          },
          {
            "name": "deposited"
          },
          {
            "name": "canceled"
          }
        ]
      }
    },
    {
      "name": "airdropStudioConfig",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "isInitialized",
            "type": "bool"
          },
          {
            "name": "configAuthority",
            "type": "pubkey"
          },
          {
            "name": "claimCostLamports",
            "type": "u64"
          },
          {
            "name": "protocolVault",
            "type": "pubkey"
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "airdropType",
      "repr": {
        "kind": "rust"
      },
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "onChainList"
          },
          {
            "name": "merkleProof"
          }
        ]
      }
    },
    {
      "name": "appendOnchainRecipientsParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "recipients",
            "type": {
              "vec": {
                "defined": {
                  "name": "recipientInput"
                }
              }
            }
          }
        ]
      }
    },
    {
      "name": "claimMerkleParams",
      "docs": [
        "Parameters supplied by claimer."
      ],
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "rootIndex",
            "type": "u8"
          },
          {
            "name": "leafIndex",
            "type": "u32"
          },
          {
            "name": "amount",
            "type": "u64"
          },
          {
            "name": "leaf",
            "type": {
              "array": [
                "u8",
                32
              ]
            }
          },
          {
            "name": "proof",
            "type": {
              "vec": {
                "defined": {
                  "name": "merkleProofNode"
                }
              }
            }
          }
        ]
      }
    },
    {
      "name": "claimOnchainParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "entryIndex",
            "type": "u32"
          },
          {
            "name": "amount",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "claimStatus",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "isInitialized",
            "type": "bool"
          },
          {
            "name": "isClaimed",
            "type": "bool"
          },
          {
            "name": "claimedAt",
            "type": "u64"
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "claimTokenEvent",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "airdrop",
            "type": "pubkey"
          },
          {
            "name": "mint",
            "type": "pubkey"
          },
          {
            "name": "claimer",
            "type": "pubkey"
          },
          {
            "name": "amount",
            "type": "u64"
          },
          {
            "name": "createdAt",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "createConfigEvent",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "configAccount",
            "type": "string"
          },
          {
            "name": "configAuthority",
            "type": "string"
          },
          {
            "name": "createdAt",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "createMerkleAirdropParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "draftIndex",
            "type": "u32"
          },
          {
            "name": "startsAt",
            "type": {
              "option": "u64"
            }
          },
          {
            "name": "endsAt",
            "type": {
              "option": "u64"
            }
          }
        ]
      }
    },
    {
      "name": "createOnchainAirdropParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "draftIndex",
            "type": "u32"
          },
          {
            "name": "startsAt",
            "type": {
              "option": "u64"
            }
          },
          {
            "name": "endsAt",
            "type": {
              "option": "u64"
            }
          }
        ]
      }
    },
    {
      "name": "createProtocolConfigEvent",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "protocolConfigAccount",
            "type": "string"
          },
          {
            "name": "actionType",
            "type": "string"
          },
          {
            "name": "configAuthority",
            "type": "string"
          },
          {
            "name": "createdAt",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "draftIndex",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "isInitialized",
            "type": "bool"
          },
          {
            "name": "creator",
            "type": "pubkey"
          },
          {
            "name": "index",
            "type": "u32"
          },
          {
            "name": "airdrop",
            "type": "pubkey"
          },
          {
            "name": "mint",
            "type": "pubkey"
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "draftRegistry",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "isInitialized",
            "type": "bool"
          },
          {
            "name": "creator",
            "type": "pubkey"
          },
          {
            "name": "totalCount",
            "type": "u32"
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "initProtocolConfigParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "action",
            "type": {
              "defined": {
                "name": "airdropAction"
              }
            }
          },
          {
            "name": "costLamports",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "initStudioConfigParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "claimCostLamports",
            "type": "u64"
          },
          {
            "name": "protocolVault",
            "type": "pubkey"
          }
        ]
      }
    },
    {
      "name": "listRoot",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "isInitialized",
            "type": "bool"
          },
          {
            "name": "airdrop",
            "type": "pubkey"
          },
          {
            "name": "totalCount",
            "type": "u32"
          },
          {
            "name": "totalAmount",
            "type": "u64"
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "merkleAirdropDepositedEvent",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "airdrop",
            "type": "pubkey"
          },
          {
            "name": "creator",
            "type": "pubkey"
          },
          {
            "name": "mint",
            "type": "pubkey"
          },
          {
            "name": "amount",
            "type": "u64"
          },
          {
            "name": "createdAt",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "merkleAirdropStartedEvent",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "airdrop",
            "type": "pubkey"
          },
          {
            "name": "creator",
            "type": "pubkey"
          },
          {
            "name": "mint",
            "type": "pubkey"
          },
          {
            "name": "vault",
            "type": "pubkey"
          },
          {
            "name": "totalAmount",
            "type": "u64"
          },
          {
            "name": "startsAt",
            "type": {
              "option": "u64"
            }
          },
          {
            "name": "endsAt",
            "type": {
              "option": "u64"
            }
          },
          {
            "name": "merkleRootHashes",
            "type": {
              "vec": "string"
            }
          },
          {
            "name": "merkleRootLeafCounts",
            "type": {
              "vec": "u32"
            }
          },
          {
            "name": "merkleRootSums",
            "type": {
              "vec": "u64"
            }
          },
          {
            "name": "uri",
            "type": {
              "option": "string"
            }
          },
          {
            "name": "airdropType",
            "type": {
              "defined": {
                "name": "airdropType"
              }
            }
          },
          {
            "name": "createdAt",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "merkleAirdropWithdrawnEvent",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "airdrop",
            "type": "pubkey"
          },
          {
            "name": "creator",
            "type": "pubkey"
          },
          {
            "name": "mint",
            "type": "pubkey"
          },
          {
            "name": "amount",
            "type": "u64"
          },
          {
            "name": "createdAt",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "merkleProofAirdrop",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "base",
            "type": {
              "defined": {
                "name": "airdropBase"
              }
            }
          },
          {
            "name": "merkleRoots",
            "type": {
              "vec": {
                "defined": {
                  "name": "merkleRootEntry"
                }
              }
            }
          },
          {
            "name": "merkleTreeUri",
            "type": {
              "option": "string"
            }
          }
        ]
      }
    },
    {
      "name": "merkleProofNode",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "siblingHash",
            "type": {
              "array": [
                "u8",
                32
              ]
            }
          },
          {
            "name": "siblingSum",
            "type": "u64"
          },
          {
            "name": "isLeft",
            "type": "bool"
          }
        ]
      }
    },
    {
      "name": "merkleRootEntry",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "root",
            "type": {
              "array": [
                "u8",
                32
              ]
            }
          },
          {
            "name": "leafCount",
            "type": "u32"
          },
          {
            "name": "rootSum",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "merkleRootRegisteredEvent",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "airdrop",
            "type": "pubkey"
          },
          {
            "name": "creator",
            "type": "pubkey"
          },
          {
            "name": "mint",
            "type": "pubkey"
          },
          {
            "name": "totalAmount",
            "type": "u64"
          },
          {
            "name": "merkleRootHashes",
            "type": {
              "vec": "string"
            }
          },
          {
            "name": "merkleRootLeafCounts",
            "type": {
              "vec": "u32"
            }
          },
          {
            "name": "merkleRootSums",
            "type": {
              "vec": "u64"
            }
          },
          {
            "name": "uri",
            "type": {
              "option": "string"
            }
          },
          {
            "name": "createdAt",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "onchainAirdropDepositedEvent",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "airdrop",
            "type": "pubkey"
          },
          {
            "name": "creator",
            "type": "pubkey"
          },
          {
            "name": "mint",
            "type": "pubkey"
          },
          {
            "name": "amount",
            "type": "u64"
          },
          {
            "name": "createdAt",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "onchainAirdropStartedEvent",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "airdrop",
            "type": "pubkey"
          },
          {
            "name": "creator",
            "type": "pubkey"
          },
          {
            "name": "mint",
            "type": "pubkey"
          },
          {
            "name": "totalAmount",
            "type": "u64"
          },
          {
            "name": "startsAt",
            "type": {
              "option": "u64"
            }
          },
          {
            "name": "endsAt",
            "type": {
              "option": "u64"
            }
          },
          {
            "name": "createdAt",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "onchainAirdropWithdrawnEvent",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "airdrop",
            "type": "pubkey"
          },
          {
            "name": "creator",
            "type": "pubkey"
          },
          {
            "name": "mint",
            "type": "pubkey"
          },
          {
            "name": "amount",
            "type": "u64"
          },
          {
            "name": "createdAt",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "onchainListAirdrop",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "base",
            "type": {
              "defined": {
                "name": "airdropBase"
              }
            }
          },
          {
            "name": "listRoot",
            "type": "pubkey"
          },
          {
            "name": "listVersion",
            "type": "u8"
          },
          {
            "name": "totalRecipients",
            "type": "u32"
          }
        ]
      }
    },
    {
      "name": "onchainRecipientsAppendedEvent",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "airdrop",
            "type": "pubkey"
          },
          {
            "name": "listRoot",
            "type": "pubkey"
          },
          {
            "name": "addedCount",
            "type": "u16"
          },
          {
            "name": "totalCount",
            "type": "u32"
          },
          {
            "name": "totalAmount",
            "type": "u64"
          },
          {
            "name": "createdAt",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "recipientInput",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "wallet",
            "type": "pubkey"
          },
          {
            "name": "amount",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "registerMerkleRootParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "merkleRoots",
            "type": {
              "vec": {
                "defined": {
                  "name": "merkleRootEntry"
                }
              }
            }
          },
          {
            "name": "uri",
            "type": {
              "option": "string"
            }
          }
        ]
      }
    },
    {
      "name": "startMerkleAirdropParams",
      "docs": [
        "Parameters for merkle airdrop start."
      ],
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "startsAt",
            "type": {
              "option": "u64"
            }
          },
          {
            "name": "endsAt",
            "type": {
              "option": "u64"
            }
          }
        ]
      }
    },
    {
      "name": "startOnchainAirdropParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "startsAt",
            "type": {
              "option": "u64"
            }
          },
          {
            "name": "endsAt",
            "type": {
              "option": "u64"
            }
          }
        ]
      }
    },
    {
      "name": "updateConfigEvent",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "configAccount",
            "type": "string"
          },
          {
            "name": "updatedBy",
            "type": "string"
          },
          {
            "name": "createdAt",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "updateProtocolConfigParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "action",
            "type": {
              "defined": {
                "name": "airdropAction"
              }
            }
          },
          {
            "name": "costLamports",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "updateStudioConfigParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "newConfigAuthority",
            "type": "pubkey"
          },
          {
            "name": "claimCostLamports",
            "type": "u64"
          },
          {
            "name": "protocolVault",
            "type": "pubkey"
          }
        ]
      }
    }
  ]
};
